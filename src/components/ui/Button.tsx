import React from 'react';

type BaseButtonProps = {
  variant?: 'primary' | 'outline';
  children: React.ReactNode;
  className?: string;
};

type ButtonAsAnchorProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

type ButtonAsButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never;
};

export type ButtonProps = ButtonAsAnchorProps | ButtonAsButtonProps;

export function Button(props: ButtonProps) {
  // 1. Destructure custom props out immediately so they don't leak into the DOM
  const { variant = 'primary', className = '', children, ...domProps } = props;
  
  const baseStyles = "inline-flex items-center justify-center px-6 py-4 text-[10px] md:text-[12px] font-semibold uppercase tracking-widest transition-colors duration-200 shrink-0 cursor-pointer";
  
  const variants = {
    primary: "bg-[#1C1B1B] text-[#FDF8F8] hover:bg-[#333333] dark:bg-[#FDF8F8] dark:text-[#1C1B1B] dark:hover:bg-[#E5E2E1]",
    outline: "bg-transparent border border-[#E5E2E1] text-[#1C1B1B] hover:border-[#1C1B1B] dark:border-[#333333] dark:text-[#FDF8F8] dark:hover:border-[#FDF8F8]"
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

  // 2. Render Anchor if href is explicitly provided
  if ('href' in domProps && domProps.href !== undefined) {
    const { href, onClick, ...anchorRest } = domProps;
    
    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (href.startsWith('#')) {
        e.preventDefault();
        
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        
        if (element) {
          const yOffset = -64; 
          const yPosition = element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: yPosition, behavior: 'smooth' });
        }
      }
      
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <a href={href} className={combinedStyles} onClick={handleAnchorClick} {...anchorRest}>
        {children}
      </a>
    );
  }

  // 3. Render standard Button (No unused 'href' extraction needed)
  return (
    <button 
      className={combinedStyles} 
      {...(domProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}