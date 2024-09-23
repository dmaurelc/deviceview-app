import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const SyncControls = ({ syncOptions, onToggle }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Synchronization Controls</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="all-sync" className="text-sm font-medium">
            Toggle all synchronizations
          </Label>
          <Switch
            id="all-sync"
            checked={Object.values(syncOptions).every(Boolean)}
            onCheckedChange={(checked) => onToggle('all', checked)}
          />
        </div>
        {Object.entries(syncOptions).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <Label htmlFor={key} className="text-sm font-medium">
              Synchronize {key.charAt(0).toUpperCase() + key.slice(1)}
            </Label>
            <Switch
              id={key}
              checked={value}
              onCheckedChange={(checked) => onToggle(key, checked)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SyncControls;