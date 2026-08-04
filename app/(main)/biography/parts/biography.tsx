"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/button";
import { Mic, Instagram, Youtube } from "lucide-react";
import { BsTwitterX } from "react-icons/bs";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaTiktok } from "react-icons/fa";

import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

// Inline markdown-lite: [label](url) links, plus bare http(s) URLs.
const INLINE_PATTERN = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/\S+)/g;

function renderInline(text: string) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  INLINE_PATTERN.lastIndex = 0;
  while ((match = INLINE_PATTERN.exec(text))) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const [full, label, mdUrl, bareUrl] = match;
    const url = mdUrl ?? bareUrl;

    nodes.push(
      <a
        key={key++}
        className="text-yellow-600 hover:underline"
        href={url}
        rel="noreferrer"
        target="_blank"
      >
        {label ?? bareUrl}
      </a>,
    );
    lastIndex = match.index + full.length;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

const HEADING_STYLES: Record<number, string> = {
  1: "text-3xl",
  2: "text-2xl",
  3: "text-xl",
};

type BioBlock =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string };

// Line-based parser: any line starting with #/##/### becomes a heading
// immediately, whether or not it has blank lines around it. Consecutive
// plain lines are joined (with a space) into one paragraph; a blank line
// starts a new paragraph.
function parseBioBlocks(content: string): BioBlock[] {
  const blocks: BioBlock[] = [];
  let buffer: string[] = [];

  const flushParagraph = () => {
    const text = buffer.join(" ").trim();

    if (text) blocks.push({ type: "paragraph", text });
    buffer = [];
  };

  for (const rawLine of content.split("\n")) {
    const line = rawLine.trim();
    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);

    if (headingMatch) {
      flushParagraph();
      blocks.push({
        type: "heading",
        level: headingMatch[1].length as 1 | 2 | 3,
        text: headingMatch[2],
      });
    } else if (line === "") {
      flushParagraph();
    } else {
      buffer.push(line);
    }
  }
  flushParagraph();

  return blocks;
}

// Renders a heading or paragraph block — either way, [label](url) links and
// bare URLs inside it become clickable.
function renderBlock(block: BioBlock, key: number, paragraphClassName: string) {
  if (block.type === "heading") {
    const Tag = `h${block.level + 1}` as "h2" | "h3" | "h4";

    return (
      <Tag
        key={key}
        className={cn(
          HEADING_STYLES[block.level],
          "font-bold text-white text-left mt-10 mb-4",
        )}
      >
        {renderInline(block.text)}
      </Tag>
    );
  }

  return (
    <p key={key} className={paragraphClassName}>
      {renderInline(block.text)}
    </p>
  );
}

export default function ComedianBio() {
  const [bioContent, setBioContent] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("biography")
      .select("content")
      .limit(1)
      .single()
      .then(
        ({ data }) => setBioContent(data?.content ?? ""),
        () => setBioContent(""),
      );
  }, []);

  const blocks = parseBioBlocks(bioContent ?? "");
  const introBlocks = blocks.slice(0, 2);
  const restBlocks = blocks.slice(2);
  const isLoading = bioContent === null;

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="relative h-[70vh] overflow-hidden">
        <div className="absolute bg-black" />
        <Image
          fill
          priority
          alt="Comedian on stage"
          className="object-cover"
          src="/Rwanda/rwanda_3.jpg"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-left text-white p-4">
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-md"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            Uganda&apos;s Top Comedian
          </motion.h1>
          <p className="text-xl md:text-2xl font-medium max-w-2xl mb-8 mt-4">
            Making the world laugh, one awkward truth at a time
          </p>
          <div className="flex gap-4">
            <Button
              as={Link}
              className=" text-white"
              href="/booking"
              size="lg"
              variant="bordered"
            >
              Book Now
            </Button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            fill="black"
            viewBox="0 0 1440 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 70C840 80 960 100 1080 100C1200 100 1320 80 1380 70L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="black"
            />
          </svg>
        </div>
      </header>

      {/* Bio Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/3 relative">
            <div className="aspect-square relative rounded-2xl overflow-hidden border-8 border-white shadow-xl">
              <Image
                fill
                alt="Alex Laughton"
                className="object-cover"
                src="/gallerypage/DSC_8976.webp"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-black rounded-full p-4 shadow-lg">
              <Mic className="h-8 w-8 text-white" />
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <h2 className="text-4xl text-left font-bold mb-6 text-white">
              About Dr. Hilary Okello
            </h2>
            {isLoading ? (
              <div
                aria-label="Loading biography"
                className="space-y-3 animate-pulse"
                role="status"
              >
                <div className="h-4 w-full rounded bg-white/10" />
                <div className="h-4 w-full rounded bg-white/10" />
                <div className="h-4 w-2/3 rounded bg-white/10" />
              </div>
            ) : introBlocks.length > 0 ? (
              introBlocks.map((block, i) =>
                renderBlock(block, i, "text-lg text-white text-left mb-6"),
              )
            ) : (
              <p className="text-lg text-white/50 text-left">
                Biography content coming soon.
              </p>
            )}
          </div>
        </div>
      </section>
      {restBlocks.length > 0 && (
        <section className="bg-black max-w-4xl mx-auto text-white px-4  py-16">
          {restBlocks.map((block, i) =>
            renderBlock(block, i, cn("text-white text-left", i > 0 && "mt-10")),
          )}
        </section>
      )}
      {/* Contact */}
      <section className="bg-black text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Lets Connect</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            For bookings, press inquiries, or just to say hello, reach out
            through any of these channels.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Button
              as={Link}
              className="border-white rounded-full text-white hover:bg-white hover:text-yellow-600"
              href="https://www.instagram.com/drhilaryokello/"
              size="lg"
              target="_blank"
              variant="bordered"
            >
              <Instagram className="mr-2 h-5 w-5" />
              Instagram
            </Button>
            <Button
              as={Link}
              className="border-white rounded-full text-white hover:bg-white hover:text-yellow-600"
              href="https://twitter.com/DrHilaryOkello"
              size="lg"
              target="_blank"
              variant="bordered"
            >
              <BsTwitterX className="mr-2 h-5 w-5" />
              Twitter
            </Button>
            <Button
              as={Link}
              className="border-white rounded-full text-white hover:bg-white hover:text-yellow-600"
              href="https://www.youtube.com/@drhilaryokello"
              size="lg"
              target="_blank"
              variant="bordered"
            >
              <Youtube className="mr-2 h-5 w-5" />
              YouTube
            </Button>
            <Button
              as={Link}
              className="border-white rounded-full text-white hover:bg-white hover:text-yellow-600"
              href="https://www.tiktok.com/@drhilary_okello?_t=ZM-8vVQayDX5aZ&_r=1"
              size="lg"
              target="_blank"
              variant="bordered"
            >
              <FaTiktok className="mr-2 h-5 w-5" />
              TikTok
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
