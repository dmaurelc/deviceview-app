import React from "react";
import { Moon, Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Header = ({
  theme,
  setTheme,
  url,
  onUrlChange,
  toggleSidebar,
  isMobile,
  hasSelectedDevices
}) => {
  const handleUrlChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith("https://") && value !== "") {
      value = "https://" + value;
    }
    onUrlChange(value);
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
                  Site URL:
                </Label>
                <Input
                  id="url-input"
                  type="text"
                  placeholder="Enter site URL"
                  value={url.startsWith("https://") ? url.slice(8) : url}
                  onChange={handleUrlChange}
                  className="w-64 font-outfit"
                />
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
