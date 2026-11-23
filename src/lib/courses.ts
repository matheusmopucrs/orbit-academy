import enem from "@/assets/course-enem.jpg";
import cs from "@/assets/course-cs.jpg";
import se from "@/assets/course-se.jpg";

export const courses = [
  { id: "enem", title: "ENEM Course", img: enem, tag: "High school", desc: "Revise everything you learned at school — math, sciences, languages and humanities — focused on the ENEM exam.", topics: ["Mathematics", "Physics & Chemistry", "Biology", "Portuguese & Essay", "History & Geography"] },
  { id: "cs", title: "Computer Science", img: cs, tag: "PUCRS", desc: "Review the full Computer Science curriculum at PUCRS, plus extra content we believe is essential.", topics: ["Algorithms & Data Structures", "Discrete Math", "Computer Architecture", "Operating Systems", "Theory of Computation"] },
  { id: "se", title: "Software Engineering", img: se, tag: "Career", desc: "From requirements to deployment: design, architecture, testing and real-world practices.", topics: ["Requirements", "Software Architecture", "Design Patterns", "Testing & QA", "DevOps & Agile"] },
];
