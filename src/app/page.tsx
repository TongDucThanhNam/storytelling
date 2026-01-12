"use client";

import { useEffect, useRef, useState } from "react";
import {
	Bar,
	BarChart,
	Cell,
	Pie,
	PieChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";

// Data configuration for the charts
const scenarios: Record<
	string,
	{
		type: "vertical" | "horizontal" | "rings";
		data?: { name: string; value: number; color: string }[];
		barData?: { name: string; value: number }[];
		pieData?: { name: string; value: number }[];
		percentages?: number[];
		textVals?: string[];
		ringLabels?: string[];
		status: string;
		caption: string;
	}
> = {
	1: {
		type: "vertical",
		barData: [
			{ name: "2025 Chiến lược", value: 45 },
			{ name: "2026 Chiến lược", value: 68 },
			{ name: "AI là Cốt lõi", value: 61 },
		],
		data: [
			{ name: "2025 Chiến lược", value: 45, color: "#999" },
			{ name: "2026 Chiến lược", value: 68, color: "#111" },
			{ name: "AI là Cốt lõi", value: 61, color: "#b33939" },
		],
		status: "ENTERPRISE ADOPTION",
		caption:
			"Tỷ lệ doanh nghiệp coi AI là chiến lược tăng từ 45% lên 68% chỉ trong 1 năm.",
	},
	2: {
		type: "vertical",
		barData: [
			{ name: "Agent Ứng dụng", value: 5 },
			{ name: "Agent Doanh nghiệp", value: 40 },
			{ name: "Thời gian Xử lý", value: 60 },
		],
		data: [
			{ name: "Agent Ứng dụng", value: 5, color: "#999" },
			{ name: "Agent Doanh nghiệp", value: 40, color: "#111" },
			{ name: "Thời gian Xử lý", value: 60, color: "#b33939" },
		],
		status: "AGENTIC WORKFLOW",
		caption:
			"Dự báo 40% ứng dụng dùng Agent. Thời gian xử lý khoản vay giảm 60%.",
	},
	3: {
		type: "vertical",
		barData: [
			{ name: "Rack Truyền thống", value: 15 },
			{ name: "Rack AI 2026", value: 100 },
			{ name: "Hiệu suất Chip 3D", value: 100 },
		],
		data: [
			{ name: "Rack Truyền thống", value: 15, color: "#999" },
			{ name: "Rack AI 2026", value: 100, color: "#b33939" },
			{ name: "Hiệu suất Chip 3D", value: 100, color: "#111" },
		],
		status: "INFRASTRUCTURE HEAT",
		caption:
			"Nhu cầu năng lượng cho AI Server gấp gần 7 lần so với Server truyền thống.",
	},
	4: {
		type: "rings",
		pieData: [
			{ name: "Filled", value: 90 },
			{ name: "Empty", value: 10 },
		],
		percentages: [90, 50],
		textVals: ["$900B", "$504B"],
		ringLabels: ["TIẾT KIỆM (2050)", "THỊ TRƯỜNG (2032)"],
		status: "HEALTHCARE IMPACT",
		caption:
			"AI giúp ngành y tế tiết kiệm 900 tỷ USD thông qua tự động hóa và chẩn đoán sớm.",
	},
	5: {
		type: "rings",
		pieData: [
			{ name: "Filled", value: 15 },
			{ name: "Empty", value: 85 },
		],
		percentages: [15, 12],
		textVals: ["15%", "134"],
		ringLabels: ["MỤC TIÊU AI LITERACY", "LUẬT SỐ 134/2025"],
		status: "VIETNAM STRATEGY",
		caption:
			"TP.HCM phổ cập AI cho 15% dân số. Luật AI có hiệu lực từ 03/2026.",
	},
};

export default function AIReport2026() {
	const [currentStep, setCurrentStep] = useState(1);
	const [isMobile, setIsMobile] = useState(false);
	const triggerRefs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth <= 900);
		checkMobile();
		window.addEventListener("resize", checkMobile);

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const step = entry.target.getAttribute("data-step");
						if (step) {
							setCurrentStep(parseInt(step, 10));
						}
					}
				});
			},
			{
				rootMargin: isMobile ? "-20% 0px -50% 0px" : "-40% 0px -40% 0px",
				threshold: 0,
			},
		);

		triggerRefs.current.forEach((el) => {
			if (el) observer.observe(el);
		});

		return () => {
			window.removeEventListener("resize", checkMobile);
			observer.disconnect();
		};
	}, [isMobile]);

	const data = scenarios[String(currentStep) as keyof typeof scenarios];

	const isVertical = data.type === "vertical";
	const isRings = data.type === "rings";

	const ring1Value = data.textVals?.[0] ?? "$900B";
	const ring2Value = data.textVals?.[1] ?? "$504B";
	const ring1Label = data.ringLabels?.[0] ?? "TIẾT KIỆM (2050)";
	const ring2Label = data.ringLabels?.[1] ?? "THỊ TRƯỜNG (2032)";

	return (
		<div className="min-h-screen bg-[#f4f4f0] text-[#1a1a1a]">
			{/* Header */}
			<header className="mx-auto max-w-250 px-5 pb-10 pt-15 text-center border-b-[5px] double-border mb-[60px]">
				<span className="block font-mono text-xs uppercase tracking-[2px] mb-[10px]">
					Deep Research Report 2026
				</span>
				<h1 className="font-sans text-[clamp(2rem,6vw,4rem)] uppercase leading-[1.1] mb-[20px] tracking-[-1px]">
					Từ Thử Nghiệm <br />
					<span className="text-[#b33939]">Đến Cách Mạng</span>
				</h1>
				<p className="text-[1.4rem] italic text-[#555] max-w-[800px] mx-auto leading-[1.4]">
					Năm 2026 đánh dấu chấm hết cho thời kỳ "hype". Trí tuệ nhân tạo giờ
					đây là năng lực cốt lõi, là cơ sở hạ tầng, và là động lực tăng trưởng
					15.7 nghìn tỷ USD của nền kinh tế toàn cầu.
				</p>
				<div className="mt-[30px] flex justify-center gap-[30px] border-t border-[#1a1a1a] pt-[10px] font-mono text-xs uppercase">
					<span>Dữ Liệu: McKinsey / Goldman Sachs / Gov.VN</span>
					<span>Hà Nội, 12/01/2026</span>
				</div>
			</header>

			{/* Main Container */}
			<div className="mx-auto max-w-[1300px] grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-[80px] px-[30px] relative pb-[300px]">
				{/* Article Content */}
				<article>
					<p className="drop-cap mb-[1.5rem] text-justify">
						Sự chuyển mình của trí tuệ nhân tạo trong giai đoạn đầu năm 2026
						đánh dấu một cột mốc lịch sử. Công nghệ này không còn nằm trong các
						phòng thí nghiệm R&D hay những dự án thí điểm mang tính phô diễn đơn
						thuần. Sau nhiều năm mở rộng nhanh chóng và những khoản đầu tư khổng
						lồ lên đến hàng tỷ đô la từ các tập đoàn công nghệ hàng đầu thế
						giới, năm 2026 đánh dấu thời điểm trí tuệ nhân tạo phải đối mặt với
						tính hữu dụng thực tế của nó trong mọi ngóc ngách của nền kinh tế
						toàn cầu. Đây là thời kỳ của sự thực thi (The Age of Execution), nơi
						các tổ chức dịch chuyển từ trạng thái tò mò thuần túy sang kỳ vọng
						về kết quả đo lường được một cách cụ thể, và từ việc sử dụng các
						công cụ hỗ trợ đơn lẻ sang việc tích hợp các hệ thống cộng tác toàn
						diện. Bản báo cáo này phân tích sâu sắc lộ trình phát triển của trí
						tuệ nhân tạo trong năm 2026, từ các đột phá về kiến trúc mô hình, hạ
						tầng phần cứng cho đến những tác động sâu rộng lên cơ cấu kinh tế,
						thị trường lao động và khung pháp lý toàn cầu, với trọng tâm đặc
						biệt vào sự chuẩn bị chiến lược của Việt Nam trong bối cảnh cạnh
						tranh công nghệ ngày càng gay gắt giữa các quốc gia.
					</p>

					{/* Section 1: Adoption */}
					<div
						ref={(el) => {
							triggerRefs.current[0] = el;
						}}
						data-step="1"
						className="relative py-[10px]"
					>
						<h3 className="font-sans text-[1.8rem] uppercase mt-[3rem] mb-[1rem] border-b-[3px] border-[#1a1a1a] inline-block pb-[5px]">
							1. Điểm Giao Thoa: Giá Trị Thực
						</h3>
						<p className="mb-[1.5rem] text-justify">
							Giai đoạn 2023-2025 được ghi nhớ như một thời kỳ bùng nổ của sự
							phấn khích và đầu tư mạo hiểm, nơi các công ty công nghệ và nhà
							đầu tư đổ xô vào lĩnh vực trí tuệ nhân tạo với những kỳ vọng khổng
							lồ. Tuy nhiên, bước sang năm 2026, thị trường đã bước vào một giai
							đoạn trưởng thành hơn nhiều, nơi sự hoài nghi lành mạnh thay thế
							cho những lời đồn thổi quá mức và kỳ vọng phi thực tế. Các doanh
							nghiệp giờ đây đang đánh giá lại (reassessing) các mục tiêu của họ
							một cách thận trọng, tập trung vào việc ưu tiên các sáng kiến trí
							tuệ nhân tạo giúp tăng cường hiệu quả vận hành và sự gắn kết của
							khách hàng thay vì chỉ theo đuổi những bản demo hào nhoáng trên
							các sân khấu công nghệ lớn.
						</p>
						<p className="mb-[1.5rem] text-justify">
							Năm 2026 được coi là thời điểm trí tuệ nhân tạo phải chứng minh
							giá trị kinh tế thực sự của mình cho các cổ đông và ban lãnh đạo.
							Những cảnh báo về việc "bong bóng trí tuệ nhân tạo" có thể tan vỡ
							do định giá quá cao trên thị trường chứng khoán vẫn tiếp tục tồn
							tại như một yếu tố rủi ro thường trực, nhưng điều này thực chất
							mang lại một tác động tích cực cho ngành: các doanh nghiệp bắt đầu
							có cái nhìn rõ ràng hơn về nơi trí tuệ nhân tạo thực sự thêm vào
							giá trị và nơi nó chỉ là một sự xao nhãng đắt đỏ không mang lại
							hiệu quả mong đợi. Các nhà quản lý cấp cao không còn chấp nhận các
							dự án thử nghiệm kéo dài mà không có lộ trình sinh lời rõ ràng và
							đo lường được. Thay vào đó, ngân sách đang được chuyển dịch một
							cách có hệ thống từ các "phòng thí nghiệm đổi mới" sang các dòng
							chi phí vận hành định kỳ, tích hợp trí tuệ nhân tạo trực tiếp vào
							hệ thống ống dẫn cơ bản của doanh nghiệp.
						</p>
						<p className="mb-[1.5rem] text-justify">
							Sự dịch chuyển từ "khám phá" sang "phổ biến" (diffusion) là đặc
							điểm cốt lõi của năm 2026. Trí tuệ nhân tạo không còn hoạt động
							như các công cụ độc lập, tách biệt khỏi luồng công việc chính, mà
							được tích hợp trực tiếp vào các quy trình công việc cốt lõi của
							doanh nghiệp. Một sự thay đổi tinh tế nhưng sâu sắc đang diễn ra:
							trí tuệ nhân tạo đang chuyển từ một công cụ mà con người sử dụng
							sang một thực thể mà con người có thể giao phó công việc một cách
							tin tưởng. Khả năng xử lý đa tài liệu, tổng hợp các sự thật từ
							nhiều nguồn khác nhau, thiết lập sơ đồ các lập luận phức tạp và
							đưa ra các quan điểm phản biện với nguồn gốc rõ ràng đã trở thành
							tiêu chuẩn không thể thiếu cho các hệ thống doanh nghiệp hiện đại.
						</p>
						<blockquote className="font-sans text-[1.5rem] leading-[1.4] border-l-[5px] border-[#b33939] pl-[20px] my-[40px] bg-white p-[30px] shadow-[10px_10px_0_rgba(0,0,0,0.05)]">
							"Chúng ta không còn sử dụng AI như một công cụ. Chúng ta giao việc
							cho nó như một nhân sự thực sự, có khả năng tự động hóa các quy
							trình phức tạp và đưa ra quyết định với độ chính xác cao."
						</blockquote>
						<p className="mb-[1.5rem] text-justify">
							Tỷ lệ doanh nghiệp triển khai AI ở mức chiến lược đã tăng vọt từ
							45% (2025) lên mức dự báo 68% trong năm nay. Đặc biệt, khái niệm
							"Core Competency" (Năng lực cốt lõi) gắn liền với AI đã tăng gấp
							đôi, phản ánh sự thay đổi căn bản trong cách các tổ chức nhìn nhận
							về vai trò của công nghệ này. Các số liệu cho thấy rõ ràng: tỷ lệ
							tổ chức sử dụng các đại lý trí tuệ nhân tạo tự trị (Autonomous
							Agents) được dự báo sẽ nhảy vọt từ 12% lên 38%, trong khi tỷ lệ AI
							trong các quy trình vận hành trọng yếu tăng từ 28% lên 52%. Những
							con số này không chỉ phản ánh sự gia tăng về mặt số lượng mà còn
							thể hiện sự chuyển đổi chất lượng trong cách thức triển khai và
							tích hợp trí tuệ nhân tạo vào hoạt động kinh doanh.
						</p>
					</div>

					{/* Section 2: Agentic AI */}
					<div
						ref={(el) => {
							triggerRefs.current[1] = el;
						}}
						data-step="2"
						className="relative py-[10px]"
					>
						<h3 className="font-sans text-[1.8rem] uppercase mt-[3rem] mb-[1rem] border-b-[3px] border-[#1a1a1a] inline-block pb-[5px]">
							2. Kỷ Nguyên Agentic AI (Đại Lý)
						</h3>
						<p className="mb-[1.5rem] text-justify">
							Sự chuyển dịch từ "trí tuệ nhân tạo hỗ trợ" sang "trí tuệ nhân tạo
							đại lý" (Agentic AI) là bước ngoặt quan trọng nhất về mặt chức
							năng trong năm 2026. Năm 2025 đã đặt nền móng với các mô hình tiên
							tiến như Gemini 3 và GPT-5, những hệ thống bắt đầu chuẩn hóa logic
							máy móc thông qua quy trình suy luận nội tại phức tạp. Bước sang
							năm 2026, các mô hình "trí tuệ nhân tạo tư duy" (Thinking AI) đã
							trở nên phổ biến và được ứng dụng rộng rãi trong môi trường doanh
							nghiệp. Thay vì chỉ đưa ra phản hồi tức thì dựa trên xác suất đơn
							giản, các hệ thống này sử dụng một quy trình tư duy bên trong phức
							tạp để cải thiện khả năng lập luận và lập kế hoạch đa bước một
							cách đáng tin cậy.
						</p>
						<p className="mb-6 text-justify">
							Những mô hình này đạt được điểm số đột phá trên các bài kiểm tra
							khắc nghiệt nhất, chẳng hạn như Humanity's Last Exam được thiết kế
							đặc biệt để xem liệu trí tuệ nhân tạo có thực sự suy nghĩ và lập
							luận như con người hay không, và GPQA Diamond đánh giá khả năng
							giải quyết các vấn đề học thuật ở mức độ chuyên gia. Khả năng tư
							duy hệ thống này đặc biệt quan trọng trong các lĩnh vực như lập
							trình phần mềm, toán học nâng cao và phân tích dữ liệu phức tạp,
							nơi một sai sót nhỏ trong logic có thể dẫn đến những hậu quả
							nghiêm trọng về mặt tài chính và an ninh.
						</p>
						<p className="mb-[1.5rem] text-justify">
							Năm 2026 chứng kiến sự trỗi dậy mạnh mẽ của{" "}
							<strong>AI Agents</strong>. Không còn là Chatbot hỏi-đáp thụ động
							đơn giản, các Agent này có khả năng tự lập kế hoạch đa bước, tự
							sửa lỗi trong quá trình thực thi và cộng tác nhóm với các agent
							khác để hoàn thành các nhiệm vụ phức tạp. Các đại lý trí tuệ nhân
							tạo giờ đây không chỉ trả lời các câu hỏi đơn lẻ; chúng tham gia
							vào quá trình suy luận kéo dài, hiểu các môi trường đa phương thức
							phức tạp và tương tác tự nhiên với con người trong bối cảnh thời
							gian dài. Điều này đánh dấu sự chuyển đổi căn bản trong mô hình
							tương tác giữa con người và máy móc.
						</p>
						<p className="mb-[1.5rem] text-justify">
							Các đặc điểm chính của hệ sinh thái đại lý trong năm 2026 bao gồm
							tính tự chủ cao với khả năng tự lập kế hoạch, tìm kiếm và lập luận
							trên web để trả lời các truy vấn tìm kiếm thông tin phức tạp mà
							không cần sự hướng dẫn từng bước của con người. Bên cạnh đó, trí
							nhớ dài hạn và bộ nhớ quy trình cho phép các cơ chế nén tiên tiến
							giúp đại lý giữ lại kiến thức qua nhiều tương tác và lập luận trên
							các phạm vi thời gian dài một cách hiệu quả. Khả năng cộng tác đa
							đại lý cũng là một bước tiến quan trọng, cho phép các hệ thống đa
							đại lý hoạt động cùng nhau, với các đại lý chuyên biệt như đại lý
							nghiên cứu pháp lý, đại lý tìm kiếm web, đại lý tài liệu khách
							hàng làm việc cùng nhau để giải quyết các luồng công việc phức
							tạp, giảm chu kỳ xem xét từ 20% đến 60% trong các lĩnh vực như
							thẩm định khoản vay hoặc tiếp thị.
						</p>
						<p className="mb-[1.5rem] text-justify">
							Gartner dự báo rằng 40% các ứng dụng doanh nghiệp sẽ tích hợp các
							đại lý trí tuệ nhân tạo chuyên biệt cho từng tác vụ, một bước nhảy
							vọt ấn tượng so với con số chưa đầy 5% của hai năm trước đó. Trong
							lĩnh vực tài chính, các "Đội ngũ AI" đang giảm thời gian thẩm định
							khoản vay tới 60%, giúp các ngân hàng và tổ chức tài chính phục vụ
							khách hàng nhanh hơn với độ chính xác cao hơn. Chúng ta đang
							chuyển từ mô hình SaaS (Software as a Service) truyền thống sang
							Service-as-Software, nơi giá trị được tạo ra không còn chỉ từ phần
							mềm mà từ các dịch vụ tự động do AI điều phối.
						</p>
					</div>

					{/* Section 3: Infrastructure */}
					<div
						ref={(el) => {
							triggerRefs.current[2] = el;
						}}
						data-step="3"
						className="relative py-[10px]"
					>
						<h3 className="font-sans text-[1.8rem] uppercase mt-[3rem] mb-[1rem] border-b-[3px] border-[#1a1a1a] inline-block pb-[5px]">
							3. Hạ Tầng: Cuộc Đua Năng Lượng
						</h3>
						<p className="mb-[1.5rem] text-justify">
							Sự gia tăng theo cấp số nhân của các nhiệm vụ và đại lý trí tuệ
							nhân tạo đòi hỏi một cuộc tái cấu trúc hạ tầng tính toán toàn cầu
							một cách căn bản. Năm 2026, hạ tầng trí tuệ nhân tạo ưu tiên tính
							hiệu quả năng lượng, tính toán phân tán và phân bổ tài nguyên
							thông minh thay vì chỉ tập trung vào sức mạnh thuần túy. Sự bùng
							nổ của AI đòi hỏi một cái giá vật lý rõ ràng: Điện năng và Nhiệt.
							Các trung tâm dữ liệu (Data Center) truyền thống đã lỗi thời và
							không còn đáp ứng được yêu cầu khắt khe của các hệ thống AI hiện
							đại đòi hỏi sức mạnh tính toán khổng lồ.
						</p>
						<p className="mb-[1.5rem] text-justify">
							Thiết kế các cơ sở tập trung vào trí tuệ nhân tạo với các giá đỡ
							(rack) dày đặc GPU và bộ tăng tốc đã trở thành mục tiêu thiết kế
							chính, không còn là một phân khúc ngách trong ngành công nghiệp
							trung tâm dữ liệu. Các giá đỡ truyền thống tiêu thụ khoảng 7-15 kW
							điện năng, nhưng các cụm đào tạo trí tuệ nhân tạo trong năm 2026
							yêu cầu từ 40 đến hơn 100 kW cho mỗi giá đỡ để đáp ứng nhu cầu
							tính toán khổng lồ. Sự thay đổi về mật độ năng lượng này buộc các
							trung tâm dữ liệu phải chuyển đổi công nghệ làm mát một cách triệt
							để và toàn diện.
						</p>
						<p className="mb-[1.5rem] text-justify">
							Làm mát bằng chất lỏng đã chuyển từ "công nghệ thú vị" trong các
							phòng thí nghiệm sang triển khai sản xuất hàng loạt trong các
							trung tâm dữ liệu quy mô lớn. Các hệ thống làm mát trực tiếp đến
							chip (direct-to-chip), bộ trao đổi nhiệt cửa sau và làm mát ngâm
							toàn phần (immersion cooling) đang trở thành tiêu chuẩn cho các
							thiết kế mới. Bên cạnh đó, mạng tốc độ cực cao cũng là một yếu tố
							quan trọng không thể thiếu: việc triển khai mạng 800G đang tăng
							tốc mạnh mẽ và những thiết bị chuyển mạch 1.6T đầu tiên đã bắt đầu
							xuất hiện trong các môi trường trí tuệ nhân tạo hiệu năng cao
							(HPC) từ đầu năm 2026. Hạ tầng mô-đun cũng đang được ưu tiên, với
							các khối nguồn và làm mát đúc sẵn được sử dụng để triển khai năng
							lực tính toán nhanh hơn, thay vì chờ đợi 18-24 tháng xây dựng
							truyền thống.
						</p>
						<p className="mb-[1.5rem] text-justify">
							Nhu cầu về hiệu quả năng lượng đã thúc đẩy những đột phá trong
							kiến trúc chip với tốc độ chưa từng có. Chip trí tuệ nhân tạo 3D
							nguyên khối (monolithic 3D) mang lại mức tăng hiệu quả năng lượng
							gấp bốn lần so với các thế hệ cũ, giảm đáng kể chi phí vận hành và
							tác động môi trường. Đồng thời, các bộ xử lý quang học (photonic
							processors) sử dụng ánh sáng để tăng tốc độ di chuyển dữ liệu,
							giúp giảm thiểu độ trễ và tiêu thụ điện năng trong các siêu máy
							tính quy mô lớn như JUPITER ở Châu Âu và Ironwood của Google. Sự
							dịch chuyển này cũng đánh dấu sự trỗi dậy của tính toán tại biên
							(edge computing) như một xu hướng chủ đạo.
						</p>
						<p className="mb-[1.5rem] text-justify">
							Thị trường tính toán biên toàn cầu dự kiến sẽ tăng từ 168.4 tỷ USD
							năm 2025 lên 249.06 tỷ USD vào năm 2030, khi các xu hướng kết nối
							mới đẩy trí tuệ nhân tạo đến gần hơn nơi dữ liệu được tạo ra. Trí
							tuệ nhân tạo sẽ không còn chỉ nằm trong các đám mây tập trung mà
							sẽ hiện diện khắp nơi, trong các hệ thống tự phục hồi, thích ứng
							và dự báo được nhúng ở rìa mạng lưới. Năm 2026 cũng đánh dấu giai
							đoạn sơ khởi nhưng đầy hứa hẹn của tính toán lai (hybrid
							computing), nơi lượng tử làm việc cùng với trí tuệ nhân tạo và
							siêu máy tính. Sự tiến bộ này trùng hợp với những tiến bộ trong
							các qubit logic (logical qubits), có khả năng phát hiện và sửa lỗi
							tính toán—một bước quan trọng hướng tới sự tin cậy trong tính toán
							lượng tử.
						</p>
					</div>

					{/* Section 4: Healthcare */}
					<div
						ref={(el) => {
							triggerRefs.current[3] = el;
						}}
						data-step="4"
						className="relative py-[10px]"
					>
						<h3 className="font-sans text-[1.8rem] uppercase mt-[3rem] mb-[1rem] border-b-[3px] border-[#1a1a1a] inline-block pb-[5px]">
							4. Y Tế: 900 Tỷ Đô La Tiết Kiệm
						</h3>
						<p className="mb-[1.5rem] text-justify">
							Trong năm 2026, trí tuệ nhân tạo đã vượt qua các dự án thử nghiệm
							để trở thành động cơ thúc đẩy giá trị trong y tế, khoa học, tài
							chính và sản xuất. Tác động của nó không chỉ là tăng tốc độ mà còn
							là thay đổi bản chất của sự khám phá và chăm sóc. Lĩnh vực y tế
							đang trải qua một bước ngoặt quan trọng, nơi trí tuệ nhân tạo trở
							thành trung tâm của mọi quy trình từ chẩn đoán đến điều trị. Việc
							đào tạo các mô hình trí tuệ nhân tạo trên dữ liệu chăm sóc sức
							khỏe chất lượng cao ở quy mô lớn đã tạo ra những hệ thống có khả
							năng vượt xa việc chỉ tóm tắt giấy tờ hay hỗ trợ đơn giản.
						</p>
						<p className="mb-[1.5rem] text-justify">
							Không lĩnh vực nào AI tác động sâu sắc như Y tế. Các hệ thống
							"Ambient Scribing" tự động ghi chép bệnh án, giải phóng bác sĩ
							khỏi thủ tục hành chính. Đây là các hệ thống tự động hóa nhiệm vụ
							ghi chép dữ liệu và biểu đồ trong thời gian thực, tích hợp trực
							tiếp với hồ sơ sức khỏe điện tử (EHR), giúp cải thiện sự cân bằng
							giữa công việc và cuộc sống cho bác sĩ và nâng cao chất lượng chăm
							sóc một cách đáng kể. Lĩnh vực y tế đang trải qua được gọi là
							"Khoảnh Khắc ChatGPT Trong Y Học Lâm Sàng", tương tự như sự thay
							đổi căn bản mà ChatGPT đã mang lại trong cách con người tương tác
							với thông tin.
						</p>
						<p className="mb-[1.5rem] text-justify">
							Các thay đổi cụ thể trong y tế năm 2026 bao gồm ROI được chứng
							minh rõ ràng: các tổ chức y tế không còn nhìn vào những lời hứa mà
							nhìn vào các chỉ số thực tế như giảm thời gian chờ đợi, cải thiện
							độ chính xác chẩn đoán và giảm bớt gánh nặng hành chính. Các công
							cụ trí tuệ nhân tạo có thể giúp tiết kiệm chi phí chăm sóc bệnh
							viện lên tới 900 tỷ USD vào năm 2050. Chăm sóc bệnh nhân làm trung
							tâm cũng được nâng cao: trí tuệ nhân tạo giúp phân tích các ghi
							chú lâm sàng, tóm tắt xuất viện và các tài liệu y tế khác để tự
							động gán các mã tiêu chuẩn hóa, giúp giảm bớt gánh nặng giấy tờ và
							cho phép nhân viên y tế dành nhiều thời gian hơn cho bệnh nhân
							thay vì bị mắc kẹt trong công việc hành chính.
						</p>
						<p className="mb-[1.5rem] text-justify">
							Phòng ngừa chủ động là một trong những ứng dụng quan trọng nhất:
							các mô hình dự đoán xác định các lỗ hổng trong hồ sơ, dự đoán rủi
							ro và tăng cường tuân thủ, giúp phát hiện sớm các xu hướng và rủi
							ro tiềm ẩn trong hành trình của bệnh nhân. Thị trường trí tuệ nhân
							tạo y tế toàn cầu được dự báo đạt 504 tỷ USD vào năm 2032, cho
							thấy tiềm năng to lớn trong việc định hình lại cách thức tiếp cận
							và trải nghiệm chăm sóc sức khỏe. Đây là cuộc cách mạng về hiệu
							suất chứ không chỉ là công nghệ.
						</p>
					</div>

					{/* Section 5: Vietnam */}
					<div
						ref={(el) => {
							triggerRefs.current[4] = el;
						}}
						data-step="5"
						className="relative py-[10px]"
					>
						<h3 className="font-sans text-[1.8rem] uppercase mt-[3rem] mb-[1rem] border-b-[3px] border-[#1a1a1a] inline-block pb-[5px]">
							5. Việt Nam: Tâm Thế Đón Đầu
						</h3>
						<p className="mb-[1.5rem] text-justify">
							Việt Nam không đứng ngoài cuộc cách mạng này. Với tầm nhìn nhất
							quán rằng chuyển đổi số là động lực quan trọng để phát triển lực
							lượng sản xuất và nâng cao năng lực cạnh tranh quốc gia, Việt Nam
							đã có những bước đi mạnh mẽ về mặt pháp lý và thực thi trong năm
							2025 và 2026. Việt Nam đã chính thức thông qua
							<strong>Luật Trí tuệ nhân tạo (134/2025/QH15)</strong>, có hiệu
							lực từ ngày 01 tháng 3 năm 2026. Đây là một trong những đạo luật
							chuyên biệt và toàn diện đầu tiên về trí tuệ nhân tạo tại Đông Nam
							Á, thể hiện tham vọng của Việt Nam trong việc định vị mình là một
							thị trường vừa thân thiện với đổi mới vừa có ý thức quản trị một
							cách có trách nhiệm.
						</p>
						<p className="mb-[1.5rem] text-justify">
							Luật Trí tuệ nhân tạo được xây dựng trên ba trụ cột chính: quản lý
							dựa trên rủi ro với việc phân loại các hệ thống trí tuệ nhân tạo
							thành bốn cấp độ rủi ro (Không thể chấp nhận, Cao, Trung bình,
							Thấp) để áp dụng các biện pháp kiểm soát phù hợp; lấy con người
							làm trung tâm với yêu cầu trí tuệ nhân tạo phải phục vụ sự thịnh
							vượng của con người, đảm bảo công bằng, minh bạch và có trách
							nhiệm giải trình; và thúc đẩy đổi mới thông qua Sandbox với việc
							thiết lập cơ chế thử nghiệm có kiểm soát cho trí tuệ nhân tạo, cho
							phép các dự án được chọn hưởng các ưu đãi hoặc giảm bớt yêu cầu
							tuân thủ để thúc đẩy thị trường phát triển năng động.
						</p>
						<p className="mb-[1.5rem] text-justify">
							Ngoài ra, từ ngày 1 tháng 1 năm 2026, Luật Công nghiệp công nghệ
							số yêu cầu các sản phẩm kỹ thuật số do trí tuệ nhân tạo tạo ra
							phải mang các dấu hiệu nhận diện rõ ràng để con người hoặc máy móc
							có thể nhận biết, nhằm đảm bảo tính minh bạch và ngăn chặn các
							hành vi giả mạo, lừa đảo trong môi trường số ngày càng phức tạp.
							Hệ sinh thái khởi nghiệp trí tuệ nhân tạo tại Việt Nam đang bùng
							nổ mạnh mẽ, với hơn 40 doanh nghiệp khởi nghiệp trí tuệ nhân tạo
							đã thu hút được 123 triệu USD từ các nhà đầu tư tư nhân, theo số
							liệu từ Bộ Công Thương.
						</p>
						<p className="mb-6 text-justify">
							TP.HCM đặt mục tiêu đầy tham vọng: Phổ cập kiến thức AI cho ít
							nhất 1% dân số vào năm 2026 và nâng lên mức 15% dân số (tương
							đương hơn 2 triệu người) vào năm 2030 thông qua phong trào "Bình
							dân học vụ số giai đoạn 2025-2026". Phong trào này nhằm phổ cập
							kiến thức về các công cụ như ChatGPT, Gemini, Copilot thông qua
							các nền tảng học trực tuyến mở (MOOC) tích hợp tài khoản VNeID. Về
							mặt hạ tầng, Thành phố sẵn sàng thử nghiệm mạng 6G tại Trung tâm
							Tài chính quốc tế và xây dựng các trung tâm siêu tính toán quốc
							gia để hỗ trợ hệ sinh thái đổi mới sáng tạo phát triển bền vững.
						</p>
						<p className="mb-6 text-justify">
							Các đại diện tiêu biểu trong hệ sinh thái AI Việt Nam bao gồm
							nhiều doanh nghiệp đáng chú ý: AI Hay với startup phát triển nền
							tảng trí tuệ nhân tạo tạo sinh kết hợp mạng xã hội, sử dụng mô
							hình ngôn ngữ lớn độc quyền có khả năng nhận diện bối cảnh văn hóa
							Việt Nam một cách tinh tế; Tập đoàn MISA cung cấp các giải pháp
							trí tuệ nhân tạo thiết thực cho hộ kinh doanh và doanh nghiệp mọi
							quy mô; Viettel AI và VNPT AI gắn liền trí tuệ nhân tạo với hạ
							tầng số và dữ liệu khách hàng quy mô lớn. Việc ứng dụng trí tuệ
							nhân tạo giúp các doanh nghiệp Việt Nam duy trì khả năng hỗ trợ
							khách hàng 24/7, giảm tải công việc thủ công và cải thiện trải
							nghiệm người dùng mà không cần đầu tư hệ thống quá phức tạp.
						</p>
					</div>
				</article>

				{/* Sticky Sidebar Visualization */}
				<aside className="relative h-full">
					<div
						className={`sticky-viz ${
							isMobile
								? "fixed bottom-0 left-0 right-0 top-auto z-[99] border-x-0 border-t-[2px] border-b-0 h-[260px] px-[15px] py-[15px]"
								: "top-[50px]"
						}`}
					>
						<div className="flex justify-between items-center border-b-2 border-[#1a1a1a] pb-[10px] mb-[20px] font-mono text-xs">
							<span className="font-bold text-[#b33939]">LIVE DATA FEED</span>
							<span>{data?.status || "INITIALIZING..."}</span>
						</div>

						{/* Vertical Bar Chart with Recharts */}
						{isVertical && data.data && (
							<div className="h-75">
								<ResponsiveContainer width="100%" height="100%">
									<BarChart
										data={data.barData}
										margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
									>
										<XAxis
											dataKey="name"
											tick={{
												fontFamily: "'Courier Prime', monospace",
												fontSize: 9,
												fill: "#111",
											}}
											axisLine={false}
											tickLine={false}
										/>
										<YAxis
											tick={{
												fontFamily: "'Courier Prime', monospace",
												fontSize: 10,
												fill: "#111",
											}}
											axisLine={false}
											tickLine={false}
											tickFormatter={(value) => `${value}%`}
										/>
										<Bar
											dataKey="value"
											radius={[0, 0, 0, 0]}
											animationDuration={800}
											animationEasing="ease-out"
										>
											{data.data?.map((entry) => (
												<Cell key={entry.name} fill={entry.color} />
											))}
										</Bar>
									</BarChart>
								</ResponsiveContainer>
							</div>
						)}

						{/* Ring Charts with Recharts */}
						{isRings && (
							<div className="flex justify-center items-center h-75 gap-10">
								{/* Ring 1 */}
								<div className="flex flex-col items-center">
									<div className="w-35 h-35">
										<ResponsiveContainer width="100%" height="100%">
											<PieChart>
												<Pie
													data={data.pieData}
													cx="50%"
													cy="50%"
													innerRadius={50}
													outerRadius={65}
													startAngle={90}
													endAngle={-270}
													dataKey="value"
													animationDuration={800}
													animationEasing="ease-out"
												>
													<Cell key="filled" fill="#b33939" />
													<Cell key="empty" fill="#e6e6e2" />
												</Pie>
											</PieChart>
										</ResponsiveContainer>
									</div>
									<span className="ring-val mt-2">{ring1Value}</span>
									<span className="ring-label text-center mt-2">
										{ring1Label}
									</span>
								</div>

								{/* Ring 2 */}
								<div className="flex flex-col items-center">
									<div className="w-35 h-35">
										<ResponsiveContainer width="100%" height="100%">
											<PieChart>
												<Pie
													data={[
														{
															name: "Filled",
															value: data.percentages?.[1] ?? 50,
														},
														{
															name: "Empty",
															value: 100 - (data.percentages?.[1] ?? 50),
														},
													]}
													cx="50%"
													cy="50%"
													innerRadius={50}
													outerRadius={65}
													startAngle={90}
													endAngle={-270}
													dataKey="value"
													animationDuration={800}
													animationEasing="ease-out"
												>
													<Cell key="filled" fill="#1a1a1a" />
													<Cell key="empty" fill="#e6e6e2" />
												</Pie>
											</PieChart>
										</ResponsiveContainer>
									</div>
									<span className="ring-val mt-2">{ring2Value}</span>
									<span className="ring-label text-center mt-2">
										{ring2Label}
									</span>
								</div>
							</div>
						)}

						<div className="viz-caption mt-5 text-xs italic border-t border-dotted border-[#999] pt-[10px] min-h-[60px]">
							{data?.caption || "Cuộn xuống để xem dữ liệu chi tiết..."}
						</div>
					</div>
				</aside>
			</div>
		</div>
	);
}
