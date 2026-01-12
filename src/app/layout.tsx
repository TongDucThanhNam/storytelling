import type { Metadata } from "next";
import { Courier_Prime, Lora, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
	variable: "--font-playfair",
	subsets: ["latin"],
	weight: ["400", "500", "700", "800", "900"],
});

const lora = Lora({
	variable: "--font-lora",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	style: ["normal", "italic"],
});

const courierPrime = Courier_Prime({
	variable: "--font-courier",
	subsets: ["latin"],
	weight: ["400", "700"],
});

export const metadata: Metadata = {
	title: "AI Report 2026: The Execution Era",
	description: "Deep Research Report 2026 - From Experimentation to Revolution",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="vi">
			<body
				className={`${playfair.variable} ${lora.variable} ${courierPrime.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
