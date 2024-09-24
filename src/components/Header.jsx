import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Logo from './Logo';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Header = ({ theme, setTheme, url, onUrlChange }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Logo className="text-primary" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">DeviceView</h1>
          </div>
          <div className="flex items-center space-x-4">
            {!isMobile && (
              <div className="flex flex-col space-y-1">
                <Label htmlFor="url-input" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Site URL
                </Label>
                <Input
                  id="url-input"
                  type="url"
                  placeholder="Enter site URL to preview"
                  value={url}
                  onChange={(e) => onUrlChange(e.target.value)}
                  className="w-64"
                />
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
