// Skill data configuration file
// Used to manage data for the skill display page

export interface Skill {
	id: string;
	name: string;
	description: string;
	icon: string; // Iconify icon name
	category: "frontend" | "backend" | "database" | "tools" | "other";
	level: "beginner" | "intermediate" | "advanced" | "expert";
	experience: {
		years: number;
		months: number;
	};
	projects?: string[]; // Related project IDs
	certifications?: string[];
	color?: string; // Skill card theme color
}

export const skillsData: Skill[] = [
	// Frontend Skills (Vue & Vite)
	{
		id: "vue",
		name: "Vue.js",
		description:
			"A progressive JavaScript framework that is easy to learn and use, suitable for rapid development.",
		icon: "logos:vue",
		category: "frontend",
		level: "intermediate", // 非Java/Spring Boot，中级
		experience: { years: 1, months: 8 },
		projects: ["data-visualization-tool", "vue-admin-dashboard"],
		color: "#4FC08D",
	},
	{
		id: "vite",
		name: "Vite",
		description:
			"Next-generation frontend build tool with fast cold starts and hot updates.",
		icon: "logos:vitejs",
		category: "frontend",
		level: "intermediate", // 非Java/Spring Boot，中级
		experience: { years: 1, months: 2 },
		projects: ["vue-project", "lightweight-frontend-app"],
		color: "#646CFF",
	},

	// Backend Skills (Java, Go, Python, Rust, Spring Boot, .NET Core)
	{
		id: "java",
		name: "Java",
		description:
			"A mainstream programming language for enterprise application development, cross-platform and object-oriented.",
		icon: "logos:java",
		category: "backend",
		level: "advanced", // 高熟练度
		experience: { years: 3, months: 6 }, // 提升经验体现高熟练度
		projects: ["enterprise-system", "microservices-api", "core-business-app"],
		color: "#ED8B00",
	},
	{
		id: "go",
		name: "Go",
		description:
			"An efficient programming language developed by Google, suitable for cloud-native and microservices development.",
		icon: "logos:go",
		category: "backend",
		level: "beginner", // 非Java/Spring Boot，初级
		experience: { years: 0, months: 8 },
		projects: ["microservice-demo", "simple-cli-tool"],
		color: "#00ADD8",
	},
	{
		id: "python",
		name: "Python",
		description:
			"A general-purpose programming language suitable for web development, data analysis, machine learning, and more.",
		icon: "logos:python",
		category: "backend",
		level: "intermediate", // 非Java/Spring Boot，中级
		experience: { years: 1, months: 10 },
		projects: ["data-analysis-app", "simple-web-api"],
		color: "#3776AB",
	},
	{
		id: "rust",
		name: "Rust",
		description:
			"A systems programming language focusing on safety, speed, and concurrency, with no garbage collector.",
		icon: "logos:rust",
		category: "backend",
		level: "beginner", // 非Java/Spring Boot，初级
		experience: { years: 0, months: 6 },
		projects: ["system-tool", "performance-critical-app"],
		color: "#CE422B",
	},
	{
		id: "spring",
		name: "Spring Boot",
		description:
			"The most popular enterprise application development framework in the Java ecosystem.",
		icon: "logos:spring-icon",
		category: "backend",
		level: "advanced", // 高熟练度
		experience: { years: 2, months: 10 }, // 提升经验体现高熟练度
		projects: ["enterprise-system", "rest-api", "microservices-gateway"],
		color: "#6DB33F",
	},
	{
		id: "dotnet-core",
		name: ".NET Core",
		description:
			"A cross-platform, open-source framework developed by Microsoft for building modern web applications, microservices, and desktop applications.",
		icon: "logos:dotnet",
		category: "backend",
		level: "intermediate", // 非Java/Spring Boot，中级
		experience: { years: 1, months: 0 },
		projects: ["web-api", "desktop-application", "dotnet-microservice"],
		color: "#512BD4",
	},
];

// Get skill statistics
export const getSkillStats = () => {
	const total = skillsData.length;
	const byLevel = {
		beginner: skillsData.filter((s) => s.level === "beginner").length,
		intermediate: skillsData.filter((s) => s.level === "intermediate")
			.length,
		advanced: skillsData.filter((s) => s.level === "advanced").length,
		expert: skillsData.filter((s) => s.level === "expert").length,
	};
	const byCategory = {
		frontend: skillsData.filter((s) => s.category === "frontend").length,
		backend: skillsData.filter((s) => s.category === "backend").length,
		database: skillsData.filter((s) => s.category === "database").length,
		tools: skillsData.filter((s) => s.category === "tools").length,
		other: skillsData.filter((s) => s.category === "other").length,
	};

	return { total, byLevel, byCategory };
};

// Get skills by category
export const getSkillsByCategory = (category?: string) => {
	if (!category || category === "all") {
		return skillsData;
	}
	return skillsData.filter((s) => s.category === category);
};

// Get advanced skills
export const getAdvancedSkills = () => {
	return skillsData.filter(
		(s) => s.level === "advanced" || s.level === "expert",
	);
};

// Calculate total years of experience
export const getTotalExperience = () => {
	// 获取当前年份
	const currentYear = new Date().getFullYear();
	// 计算当前年份与2020年的差值（总经验年数）
	const experienceYears = currentYear - 2020;

	// 保持原有返回结构（years为年份差，months设为0，如需自定义月份可调整）
	return {
		years: experienceYears,
		months: 6, // 若你需要指定固定月份，可替换为具体数字（如6表示6个月）
	};
};