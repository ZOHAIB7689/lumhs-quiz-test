import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";

import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, MountainIcon } from "@/components/icons/icons";

export default function Component() {
  return (
    <div className="flex  min-h-[100dvh] flex-col bg-[#0e0e0e] bg-[url('/pattern.svg')] bg-[length:100px_100px] bg-repeat">
        <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="blue"
      />
      <header className="flex h-14 items-center justify-between px-4  lg:px-6">
        <Link
          className="flex items-center justify-center"
          href="https://github.com/zohaib7689"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MountainIcon className="h-6 w-6 text-white" />
          <span className="sr-only">Asharib Ali</span>
        </Link>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center bg-dot-white/[0.12] space-y-6 px-4 text-center md:px-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
            Take the Quiz
          </h1>
          <p className="max-w-[600px] text-gray-400 md:text-xl">
          A quiz app for LUMHS papers practice to test their knowledge based on previous exam papers and relevant topics.
</p>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="text-white" variant="link">
              Available Quizzes
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href="/arrays">Quiz number 1</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/#">Further Test will come soon</Link>
            {/* 
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/asynchronous">Asynchronous Quiz</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/loops">JS Loops Quiz</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/arrays">JS Arrays Quiz</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/modules">JS Modules Quiz</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/variables">JS Variables Quiz</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/js-ts">JS & TS Intro Quiz</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/react">React Intro Quiz</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/react-3">React Three Quiz</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/react-4">React Four Quiz</Link>*/}
            </DropdownMenuItem> 
          </DropdownMenuContent>
        </DropdownMenu>

      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t border-[#1e1e1e] px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024. All rights reserved.
        </p>
        <div className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link
            className="text-xs text-white underline-offset-4 hover:underline"
            href="https://https://www.linkedin.com/in/zohaib-baloch-78974b2b5/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Build with ❤️ by Zohaib
          </Link>
        </div>
      </footer>
    </div>
  );
}
