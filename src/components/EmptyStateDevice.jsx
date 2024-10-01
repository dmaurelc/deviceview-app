import React from "react";
import { Smartphone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "../contexts/LanguageContext";

const EmptyStateDevice = ({ url, onUrlChange, onAddRandomDevice }) => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleUrlChange = (e) => {
    const value = e.target.value;
    onUrlChange(value.startsWith("http") ? value : `https://${value}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      onAddRandomDevice();
    } else {
      toast({
        title: t('invalidUrl'),
        description: t('pleaseEnterUrl'),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-800 p-8">
      <Smartphone className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
        {t('startPreview')}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
        {t('enterUrlDescription')}
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <Label htmlFor="url-input" className="sr-only">
          {t('siteUrl')}
        </Label>
        <div className="flex gap-2">
          <Input
            id="url-input"
            type="text"
            placeholder={t('enterUrl')}
            value={url.startsWith("https://") ? url.slice(8) : url}
            onChange={handleUrlChange}
            className="flex-grow font-outfit"
          />
          <Button type="submit">{t('preview')}</Button>
        </div>
      </form>
    </div>
  );
};

export default EmptyStateDevice;