#!/usr/bin/env python3
"""Scrape Google Scholar citation counts and update publications.ts"""

import re
import time
import random
import urllib.request
import urllib.parse
from html.parser import HTMLParser

SCHOLAR_ID = "xphZoxIAAAAJ"
PUB_FILE = "src/data/publications.ts"
MIN_CITATIONS = 50


class ScholarParser(HTMLParser):
    """Parse Google Scholar profile page for paper titles and citation counts."""

    def __init__(self):
        super().__init__()
        self.papers = []
        self._in_title = False
        self._in_citation = False
        self._current_title = ""
        self._current_citations = ""

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        cls = attrs_dict.get("class", "")
        if tag == "a" and "gsc_a_at" in cls:
            self._in_title = True
            self._current_title = ""
        if tag == "a" and "gsc_a_ac" in cls:
            self._in_citation = True
            self._current_citations = ""

    def handle_endtag(self, tag):
        if tag == "a" and self._in_title:
            self._in_title = False
        if tag == "a" and self._in_citation:
            self._in_citation = False
            cites = self._current_citations.strip()
            self.papers.append({
                "title": self._current_title.strip(),
                "citations": int(cites) if cites.isdigit() else 0,
            })

    def handle_data(self, data):
        if self._in_title:
            self._current_title += data
        if self._in_citation:
            self._current_citations += data


def fetch_scholar_page(scholar_id, start=0):
    """Fetch a page of Google Scholar profile results."""
    params = urllib.parse.urlencode({
        "user": scholar_id,
        "hl": "en",
        "cstart": start,
        "pagesize": 100,
        "sortby": "cited",
    })
    url = f"https://scholar.google.com/citations?{params}"
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                      "AppleWebKit/537.36 (KHTML, like Gecko) "
                      "Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
    })
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8", errors="replace")


def get_all_papers(scholar_id):
    """Fetch all papers from Google Scholar profile."""
    parser = ScholarParser()
    html = fetch_scholar_page(scholar_id, start=0)
    parser.feed(html)
    return parser.papers


def normalize(title):
    """Normalize title for fuzzy matching."""
    return re.sub(r"[^a-z0-9]", "", title.lower())


def update_publications(papers):
    """Update citations in publications.ts."""
    with open(PUB_FILE, "r") as f:
        content = f.read()

    scholar_map = {normalize(p["title"]): p["citations"] for p in papers}

    # Extract all titles from the TS file
    title_pattern = re.compile(r'title:\s*"([^"]+)"')
    matches = list(title_pattern.finditer(content))

    updated = 0
    for match in matches:
        ts_title = match.group(1)
        norm_title = normalize(ts_title)

        # Try exact match first, then prefix match
        citations = scholar_map.get(norm_title)
        if citations is None:
            for scholar_norm, scholar_cites in scholar_map.items():
                if scholar_norm.startswith(norm_title[:40]) or norm_title.startswith(scholar_norm[:40]):
                    citations = scholar_cites
                    break

        if citations is None or citations < MIN_CITATIONS:
            # Remove citations field if below threshold
            block_start = content.rfind("{", 0, match.start())
            block_end = content.find("}", match.end())
            if block_start != -1 and block_end != -1:
                block = content[block_start:block_end + 1]
                new_block = re.sub(r"\n\s*citations:\s*\d+,", "", block)
                if new_block != block:
                    content = content[:block_start] + new_block + content[block_end + 1:]
                    updated += 1
            continue

        # Find the publication block containing this title
        block_start = content.rfind("{", 0, match.start())
        block_end = content.find("}", match.end())
        if block_start == -1 or block_end == -1:
            continue

        block = content[block_start:block_end + 1]

        # Update or insert citations
        cite_pattern = re.compile(r"citations:\s*\d+")
        if cite_pattern.search(block):
            new_block = cite_pattern.sub(f"citations: {citations}", block)
        else:
            # Insert after highlight or venue line
            insert_after = re.search(r"(highlight:\s*true,|venue:\s*\"[^\"]+\",)", block)
            if insert_after:
                pos = insert_after.end()
                indent = "    "
                new_block = block[:pos] + f"\n{indent}citations: {citations}," + block[pos:]
            else:
                continue

        if new_block != block:
            content = content[:block_start] + new_block + content[block_end + 1:]
            updated += 1
            print(f"  Updated: {ts_title} -> {citations} citations")

    with open(PUB_FILE, "w") as f:
        f.write(content)

    return updated


def main():
    print(f"Fetching Google Scholar data for {SCHOLAR_ID}...")
    papers = get_all_papers(SCHOLAR_ID)
    print(f"Found {len(papers)} papers on Google Scholar")

    for p in papers:
        if p["citations"] >= MIN_CITATIONS:
            print(f"  [{p['citations']}] {p['title'][:60]}")

    print(f"\nUpdating {PUB_FILE}...")
    count = update_publications(papers)
    print(f"Done. Updated {count} entries.")


if __name__ == "__main__":
    main()
