import { NewsArticle, Tag } from "@/features/news/types";

export const newsDatabase: NewsArticle[] = [
  {
    id: "1",
    title: "Revolutionary AI Breakthrough Transforms Healthcare Diagnostics",
    content:
      "Scientists have developed a groundbreaking AI system that can detect diseases with 99% accuracy, potentially saving millions of lives through early detection. The technology uses advanced machine learning algorithms to analyze medical scans and identify patterns that human doctors might miss. This breakthrough represents a significant leap forward in medical diagnostics, combining the power of artificial intelligence with medical expertise. The system has been trained on millions of medical images and can detect early signs of cancer, heart disease, and other critical conditions. Medical professionals are hailing this as a transformative moment in healthcare that could democratize access to high-quality diagnostics worldwide.",
    author: "Dr. Sarah Johnson",
    publishedAt: new Date("2024-01-15T10:30:00Z"),
    tags: [Tag.TECHNOLOGY, Tag.HEALTH],
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800",
  },
  {
    id: "2",
    title: "New Smartphone Battery Technology Promises Week-Long Charge",
    content:
      "A startup has unveiled a revolutionary battery technology that could keep smartphones running for up to 7 days on a single charge. The breakthrough uses solid-state battery materials that are safer and more efficient than traditional lithium-ion batteries. The new technology addresses one of the biggest pain points for smartphone users: battery anxiety. Researchers at the company have spent five years developing this breakthrough, which could potentially revolutionize not just smartphones but all portable electronics. The solid-state design eliminates the risk of fire associated with current battery technologies and can withstand more charge cycles before degradation. Industry experts predict this could mark the beginning of a new era in energy storage technology.",
    author: "Michael Chen",
    publishedAt: new Date("2024-01-14T14:20:00Z"),
    tags: [Tag.TECHNOLOGY],
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
  },
  {
    id: "3",
    title: "Groundbreaking Study Reveals Benefits of Mediterranean Diet",
    content:
      "A comprehensive 10-year study involving over 50,000 participants has confirmed that the Mediterranean diet significantly reduces the risk of heart disease and cognitive decline. Researchers attribute the benefits to high consumption of olive oil, fish, and fresh vegetables. The study, conducted by leading research institutions across Europe, provides the most compelling evidence yet about the health benefits of this traditional dietary pattern. Participants who strictly followed the Mediterranean diet showed a 30% reduction in heart disease risk and significant improvements in cognitive function. The research suggests that the combination of healthy fats, antioxidants, and anti-inflammatory compounds in Mediterranean foods creates a powerful protective effect for both heart and brain health.",
    author: "Dr. Elena Rodriguez",
    publishedAt: new Date("2024-01-13T09:15:00Z"),
    tags: [Tag.HEALTH],
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
  },
  {
    id: "4",
    title: "Blockbuster Movie Shatters Box Office Records",
    content:
      'The highly anticipated sci-fi epic "Cosmic Odyssey" has broken opening weekend records, earning $500 million globally. The film, starring Emma Thompson and Chris Johnson, has received critical acclaim for its stunning visual effects and compelling storyline. The movie has captivated audiences worldwide with its ambitious storytelling and groundbreaking visual effects that push the boundaries of what\'s possible in cinema. Critics are praising it as a masterpiece that combines spectacular action with deep emotional resonance. The film\'s success marks a significant moment for the entertainment industry, demonstrating that audiences are hungry for ambitious, thought-provoking science fiction. Industry analysts predict it could become one of the highest-grossing films of all time.',
    author: "Jessica Martinez",
    publishedAt: new Date("2024-01-12T18:45:00Z"),
    tags: [Tag.ENTERTAINMENT],
    imageUrl:
      "https://images.unsplash.com/photo-1489599457952-9b1d8b5b4c1f?w=800",
  },
  {
    id: "5",
    title: "Quantum Computer Solves Complex Problem in Minutes",
    content:
      "IBM researchers have demonstrated a quantum computer capable of solving optimization problems that would take traditional supercomputers thousands of years. The breakthrough marks a significant milestone in the development of practical quantum computing applications. The achievement represents a major step forward in the quest for quantum supremacy, demonstrating that quantum computers can solve real-world problems that are intractable for classical computers. The quantum processor successfully solved a complex optimization problem related to logistics and supply chain management in just 15 minutes, a task that would require millennia of computation on current supercomputers. This breakthrough could have far-reaching implications for fields ranging from cryptography to drug discovery and financial modeling.",
    author: "Prof. James Wilson",
    publishedAt: new Date("2024-01-11T11:00:00Z"),
    tags: [Tag.TECHNOLOGY],
    imageUrl:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
  },
  {
    id: "6",
    title: "Revolutionary Gene Therapy Shows Promise for Rare Diseases",
    content:
      "Medical researchers have successfully used CRISPR gene editing to treat a rare genetic disorder in clinical trials. The therapy shows promise for treating hundreds of other genetic conditions, offering hope to millions of patients worldwide. The breakthrough therapy successfully corrected the genetic mutation responsible for the rare disease, with patients showing significant improvement in their symptoms and quality of life. This represents a major milestone in the field of gene therapy, demonstrating the potential to cure genetic diseases at their source. The research team is now working to apply this approach to more common genetic disorders, potentially revolutionizing the treatment of conditions ranging from cystic fibrosis to muscular dystrophy.",
    author: "Dr. Amanda Foster",
    publishedAt: new Date("2024-01-10T16:30:00Z"),
    tags: [Tag.HEALTH, Tag.TECHNOLOGY],
    imageUrl:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800",
  },
  {
    id: "7",
    title: "Music Festival Announces Star-Studded Lineup",
    content:
      "The annual Summer Music Festival has announced its biggest lineup yet, featuring over 100 artists across multiple genres. Headliners include international superstars and emerging talents, promising an unforgettable experience for music fans. The festival has expanded to five days this year, reflecting its growing popularity and the organizers' commitment to providing diverse musical experiences. The lineup spans everything from rock and pop to electronic, hip-hop, and world music, ensuring there's something for every musical taste. Industry insiders are calling it the most ambitious festival lineup of the year, with several artists making their only North American festival appearances. The event is expected to draw over 200,000 attendees and generate significant economic impact for the region.",
    author: "Ryan Thompson",
    publishedAt: new Date("2024-01-09T12:00:00Z"),
    tags: [Tag.ENTERTAINMENT],
    imageUrl:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",
  },
  {
    id: "8",
    title: "New Fitness App Uses AI to Create Personalized Workouts",
    content:
      "A revolutionary fitness app launched this week uses artificial intelligence to create customized workout plans based on users' goals, fitness level, and preferences. The app adapts in real-time to progress and provides form correction through smartphone cameras. The application represents a significant advancement in digital fitness technology, combining machine learning algorithms with computer vision to provide personalized training guidance. The AI analyzes users' movement patterns and provides real-time feedback to prevent injury and maximize effectiveness. Early users report impressive results, with many achieving their fitness goals faster than with traditional personal training. The app also includes nutritional guidance and mental wellness features, making it a comprehensive health platform.",
    author: "Lisa Anderson",
    publishedAt: new Date("2024-01-08T08:45:00Z"),
    tags: [Tag.TECHNOLOGY, Tag.HEALTH],
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
  },
  {
    id: "9",
    title: "Broadway Revival Breaks All Attendance Records",
    content:
      'The highly anticipated revival of the classic musical "Midnight in Manhattan" has broken all Broadway attendance records, with sold-out shows extending through the end of the year. Critics are calling it "the theatrical event of the decade." The production features a star-studded cast led by Tony Award winners and has been praised for its innovative staging and breathtaking choreography. The revival has captivated both longtime fans and new audiences, proving the enduring appeal of classic theater. Ticket prices have reached record levels on the secondary market, reflecting unprecedented demand. The success has sparked renewed interest in Broadway productions, with several other revivals now in development. Theater critics are hailing it as a masterclass in how to reimagine classic material for contemporary audiences.',
    author: "David Mitchell",
    publishedAt: new Date("2024-01-07T19:20:00Z"),
    tags: [Tag.ENTERTAINMENT],
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
  },
  {
    id: "10",
    title: "Breakthrough in Alzheimer's Prevention Research",
    content:
      "Researchers have identified a new compound that shows remarkable promise in preventing the onset of Alzheimer's disease in early clinical trials. The discovery could revolutionize how we approach neurodegenerative diseases and aging. The experimental compound, developed by a team of neuroscientists, has demonstrated the ability to prevent the formation of amyloid plaques in the brain, which are believed to be a primary cause of Alzheimer's disease. Early trial results show participants receiving the compound maintained cognitive function far better than the placebo group. The research team is cautiously optimistic about the potential to prevent or significantly delay the onset of Alzheimer's in at-risk populations. This breakthrough could transform millions of lives and reduce the enormous economic and social burden of dementia worldwide.",
    author: "Dr. Robert Chang",
    publishedAt: new Date("2024-01-06T13:15:00Z"),
    tags: [Tag.HEALTH],
    imageUrl:
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800",
  },
];

// Helper functions
export const findNewsById = (id: string): NewsArticle | undefined => {
  return newsDatabase.find(article => article.id === id);
};

export const getAllNews = (): NewsArticle[] => {
  return newsDatabase;
};