export interface Publication {
  title: string
  authors: string
  venue: string
  year: string
  highlight?: boolean
  video?: string
  image?: string
  citations?: number
  links?: { label: string; url: string }[]
}

const V = "https://jaycewen.github.io"

export const publications: Publication[] = [
  {
    title: "ActiveUMI: Robotic Manipulation with Active Perception from Robot-Free Human Demonstrations",
    authors: "Qiyuan Zeng, Chengmeng Li, Jude St John, Zhongyi Zhou, Junjie Wen, Guorui Feng, Yichen Zhu, Yi Xu",
    venue: "ICRA 2026",
    year: "2026",
    video: "/videos/active_umi.mp4",
    links: [
      { label: "Website", url: "https://activeumi.github.io/" },
      { label: "Paper", url: "https://arxiv.org/abs/2510.01607" },
    ],
  },
  {
    title: "HumanoidExo: Scalable Whole-Body Humanoid Manipulation via Wearable Exoskeleton",
    authors: "Rui Zhong, Yizhe Sun, Junjie Wen, Jinming Li, Chuang Cheng, Wei Dai, Zhiwen Zeng, Huimin Lu, Yichen Zhu, Yi Xu",
    venue: "ICRA 2026",
    year: "2026",
    video: "/videos/humanoid.mp4",
    links: [
      { label: "Website", url: "https://humanoid-exo.github.io/" },
      { label: "Paper", url: "https://arxiv.org/abs/2510.03022" },
    ],
  },
  {
    title: "dVLA: Diffusion Vision-Language-Action Model with Multimodal Chain-of-Thought",
    authors: "Junjie Wen*, Minjie Zhu*, Jiaming Liu, Zhiyuan Liu, Yicun Yang, Linfeng Zhang, Shanghang Zhang, Yichen Zhu, Yi Xu",
    venue: "Arxiv",
    year: "2025",
    highlight: true,
    image: "https://arxiv.org/html/2509.25681v1/x1.png",
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2509.25681" },
    ],
  },
  {
    title: "DexVLA: Vision-Language Model with Plug-In Diffusion Expert for General Robot Control",
    authors: "Junjie Wen*, Yichen Zhu*, Zhibin Tang, Jinming Li, Yaxin Peng, Chaomin Shen, Feifei Feng",
    venue: "CoRL 2025",
    year: "2025",
    highlight: true,
    citations: 114,
    video: `${V}/videos/laundry_fold_clip2.mp4`,
    links: [
      { label: "Website", url: "https://dex-vla.github.io/" },
      { label: "Paper", url: "https://arxiv.org/abs/2502.05855" },
      { label: "Code", url: "https://github.com/juruobenruo/DexVLA" },
    ],
  },
  {
    title: "TinyVLA: Towards Fast, Data-Efficient Vision-Language-Action Models for Robotic Manipulation",
    authors: "Junjie Wen*, Yichen Zhu*, Jinming Li, Minjie Zhu, Kun Wu, Zhiyuan Xu, Ran Cheng, Chaomin Shen, Yaxin Peng, Feifei Feng",
    venue: "RA-L 2025 / IROS 2025",
    year: "2025",
    highlight: true,
    citations: 261,
    video: `${V}/videos/tinyvla.mp4`,
    links: [
      { label: "Website", url: "https://tiny-vla.github.io/" },
      { label: "Paper", url: "https://arxiv.org/abs/2409.12514" },
      { label: "Code", url: "https://github.com/lesjie-wen/tinyvla" },
    ],
  },
  {
    title: "PointVLA: Injecting the 3D World into Vision-Language-Action Models",
    authors: "Chengmeng Li, Junjie Wen, Yan Peng, Yaxin Peng, Feifei Feng, Yichen Zhu",
    venue: "ICRA 2025",
    year: "2025",
    citations: 51,
    video: "/videos/pointvla.mp4",
    links: [
      { label: "Website", url: "https://pointvla.github.io/" },
      { label: "Paper", url: "https://arxiv.org/abs/2503.07511" },
    ],
  },
  {
    title: "ChatVLA-2: Vision-Language-Action Model with Open-World Embodied Reasoning from Pretrained Knowledge",
    authors: "Zhongyi Zhou, Yichen Zhu, Junjie Wen, Chaomin Shen, Yi Xu",
    venue: "EMNLP 2025 Main Oral",
    year: "2025",
    video: "/videos/chatvla2.mp4",
    links: [
      { label: "Website", url: "https://chatvla-2.github.io/" },
      { label: "Paper", url: "https://arxiv.org/abs/2505.21906" },
    ],
  },
  {
    title: "ChatVLA: Unified Multimodal Understanding and Robot Control with Vision-Language-Action Model",
    authors: "Zhongyi Zhou, Yichen Zhu, Minjie Zhu, Junjie Wen, Ning Liu, Zhiyuan Xu, Weibin Meng, Ran Cheng, Yaxin Peng, Chaomin Shen, Feifei Feng",
    venue: "EMNLP",
    year: "2025",
    citations: 74,
    video: "/videos/chatvla.mp4",
    links: [
      { label: "Website", url: "https://chatvla.github.io/" },
      { label: "Paper", url: "https://arxiv.org/abs/2502.14420" },
    ],
  },
  {
    title: "WorldEval: World Model as Real-World Robot Policies Evaluator",
    authors: "Yaxuan Li, Yichen Zhu, Junjie Wen, Chaomin Shen, Yi Xu",
    venue: "Arxiv",
    year: "2025",
    video: "/videos/worldeval.mp4",
    links: [
      { label: "Website", url: "https://worldeval.github.io/" },
      { label: "Paper", url: "https://arxiv.org/abs/2505.19017" },
    ],
  },
  {
    title: "ObjectVLA: End-to-End Open-World Object Manipulation Without Demonstration",
    authors: "Minjie Zhu, Yichen Zhu, Jinming Li, Zhongyi Zhou, Junjie Wen, Xiaoyu Liu, Chaomin Shen, Yaxin Peng, Feifei Feng",
    venue: "Arxiv",
    year: "2025",
    links: [
      { label: "Website", url: "https://objectvla.github.io/" },
      { label: "Paper", url: "https://arxiv.org/abs/2502.19250" },
    ],
  },
  {
    title: "Scaling Diffusion Policy in Transformer to 1 Billion Parameters for Robotic Manipulation",
    authors: "Minjie Zhu*, Yichen Zhu*, Jinming Li, Junjie Wen, Zhiyuan Xu, Ning Liu, Ran Cheng, Chaomin Shen, Yaxin Peng, Feifei Feng",
    venue: "ICRA",
    year: "2025",
    video: `${V}/videos/scaledp.mp4`,
    links: [
      { label: "Website", url: "https://scaling-diffusion-policy.github.io/" },
      { label: "Paper", url: "https://arxiv.org/abs/2409.14411" },
    ],
  },
  {
    title: "Discrete Policy: Learning Disentangled Action Space for Multi-Task Robotic Manipulation",
    authors: "Kun Wu, Yichen Zhu, Jinming Li, Junjie Wen, Ning Liu, Zhiyuan Xu, Qinru Qiu, Jian Tang",
    venue: "ICRA",
    year: "2025",
    video: `${V}/videos/discreteDP.mp4`,
    links: [
      { label: "Website", url: "https://discretepolicy.github.io/" },
      { label: "Paper", url: "https://arxiv.org/abs/2409.18707" },
    ],
  },
  {
    title: "Diffusion-VLA: Scaling Robot Foundation Models via Unified Diffusion and Autoregression",
    authors: "Junjie Wen*, Minjie Zhu*, Yichen Zhu*, Zhibin Tang, Jinming Li, Zhongyi Zhou, Chengmeng Li, Xiaoyu Liu, Yaxin Peng, Chaomin Shen",
    venue: "Arxiv",
    year: "2024",
    highlight: true,
    citations: 102,
    video: `${V}/videos/divla.mp4`,
    links: [
      { label: "Website", url: "https://diffusion-vla.github.io/" },
      { label: "Paper", url: "https://arxiv.org/abs/2412.03293" },
    ],
  },
  {
    title: "Object-Centric Instruction Augmentation for Robotic Manipulation",
    authors: "Junjie Wen*, Yichen Zhu*, Minjie Zhu, Jinming Li, Zhiyuan Xu, Zhengping Che, Chaomin Shen, Yaxin Peng, Dong Liu, Feifei Feng, Jian Tang",
    venue: "ICRA",
    year: "2024",
    highlight: true,
    video: `${V}/videos/oci.mp4`,
    links: [
      { label: "Website", url: "https://oci-robotics.github.io/" },
      { label: "Paper", url: "https://ieeexplore.ieee.org/document/10609992" },
    ],
  },
  {
    title: "Language-Conditioned Robotic Manipulation with Fast and Slow Thinking",
    authors: "Minjie Zhu*, Yichen Zhu*, Jinming Li, Junjie Wen, Zhiyuan Xu, Zhengping Che, Chaomin Shen, Yaxin Peng, Dong Liu, Feifei Feng, Jian Tang",
    venue: "ICRA",
    year: "2024",
    video: `${V}/videos/rfst.mp4`,
    links: [
      { label: "Website", url: "https://jlm-z.github.io/RSFT/" },
      { label: "Paper", url: "https://ieeexplore.ieee.org/document/10611525" },
    ],
  },
  {
    title: "A Survey on Robotics with Foundation Models: toward Embodied AI",
    authors: "Zhiyuan Xu*, Kun Wu*, Junjie Wen, Jinming Li, Ning Liu, Zhengping Che, Jian Tang",
    venue: "Arxiv",
    year: "2024",
    citations: 91,
    image: `${V}/embodied_ai_survey.jpg`,
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2402.02385" },
    ],
  },
]
