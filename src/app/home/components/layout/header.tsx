import React from 'react';


function Header() {

  return (
    <header
      className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="m-auto container flex h-14 items-center">
          <div className="mr-4 hidden md:flex"><a className="mr-4 flex items-center gap-2 lg:mr-6" href="/">
            <img src="/logo.svg" alt="Logo"  width={32} height={32} />
            <span className="hidden font-bold lg:inline-block">Xiphias Gradius</span></a>
            {/*<nav className="flex items-center gap-4 text-sm xl:gap-6"><a*/}
            {/*  className="transition-colors hover:text-foreground/80 text-foreground/80" href="/docs">Docs</a><a*/}
            {/*  className="transition-colors hover:text-foreground/80 text-foreground"*/}
            {/*  href="/docs/components">Components</a><a*/}
            {/*  className="transition-colors hover:text-foreground/80 text-foreground/80" href="/blocks">Blocks</a><a*/}
            {/*  className="transition-colors hover:text-foreground/80 text-foreground/80" href="/charts">Charts</a><a*/}
            {/*  className="transition-colors hover:text-foreground/80 text-foreground/80" href="/themes">Themes</a><a*/}
            {/*  className="transition-colors hover:text-foreground/80 text-foreground/80" href="/colors">Colors</a></nav>*/}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;