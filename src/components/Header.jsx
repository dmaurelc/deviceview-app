import React from "react";
import { Moon, Sun, Laptop, Menu, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "../contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = ({
  theme,
  setTheme,
  url,
  onUrlChange,
  toggleSidebar,
  isMobile,
  hasSelectedDevices
}) => {
  const { language, changeLanguage, t } = useLanguage();

  const handleUrlChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith("https://") && value !== "") {
      value = "https://" + value;
    }
    onUrlChange(value);
  };

  const cycleTheme = () => {
    const themes = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-5 w-5" />;
      case 'dark':
        return <Moon className="h-5 w-5" />;
      case 'system':
        return <Laptop className="h-5 w-5" />;
      default:
        return <Sun className="h-5 w-5" />;
    }
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-full mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Logo className="text-primary" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white font-outfit">
              DeviceView
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {!isMobile && hasSelectedDevices && (
              <div className="flex items-center space-x-2">
                <Label
                  htmlFor="url-input"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 font-outfit"
                >
                  {t('siteUrl')}
                </Label>
                <Input
                  id="url-input"
                  type="text"
                  placeholder={t('enterUrl')}
                  value={url.startsWith("https://") ? url.slice(8) : url}
                  onChange={handleUrlChange}
                  className="w-64 font-outfit"
                />
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={cycleTheme}
              aria-label={`Toggle theme (current: ${theme})`}
            >
              {getThemeIcon()}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => changeLanguage('es')}>
                  Español
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('en')}>
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;