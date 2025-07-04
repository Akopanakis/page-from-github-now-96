import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  Command as CommandIcon,
  ArrowRight,
  Zap,
  BarChart3,
  Calculator,
  Package,
  Shield,
  Settings,
  Users,
  TrendingUp,
  FileText,
  Globe,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CommandItem {
  id: string;
  title: string;
  description: string;
  category: string;
  action: () => void;
  icon: React.ComponentType<any>;
  shortcut?: string;
}

interface CommandPaletteSystemProps {
  onNavigate: (path: string) => void;
}

const CommandPaletteSystem: React.FC<CommandPaletteSystemProps> = ({
  onNavigate,
}) => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: CommandItem[] = [
    {
      id: "dashboard",
      title: language === "el" ? "Κέντρο Ελέγχου" : "Dashboard",
      description: language === "el" ? "Κεντρικό dashboard" : "Main dashboard",
      category: language === "el" ? "Κύρια" : "Main",
      action: () => onNavigate("/"),
      icon: BarChart3,
      shortcut: "Ctrl+D",
    },
    {
      id: "costs",
      title: language === "el" ? "Κόστη" : "Costs",
      description:
        language === "el" ? "Υπολογισμός κόστους" : "Cost calculation",
      category: language === "el" ? "Κύρια" : "Main",
      action: () => onNavigate("/costs"),
      icon: Calculator,
      shortcut: "Ctrl+C",
    },
    {
      id: "business-intelligence",
      title: "Business Intelligence",
      description: language === "el" ? "AI Analytics" : "AI Analytics",
      category: language === "el" ? "Αναλυτικά" : "Analytics",
      action: () => onNavigate("/analytics/business-intelligence"),
      icon: Zap,
      shortcut: "Ctrl+B",
    },
    {
      id: "financial",
      title: language === "el" ? "Χρηματοοικονομικά" : "Financial",
      description:
        language === "el" ? "Χρηματοοικονομική ανάλυση" : "Financial analysis",
      category: language === "el" ? "Αναλυτικά" : "Analytics",
      action: () => onNavigate("/analytics/financial"),
      icon: TrendingUp,
      shortcut: "Ctrl+F",
    },
    {
      id: "haccp",
      title: "HACCP",
      description: language === "el" ? "Μονάδα HACCP" : "HACCP Module",
      category: language === "el" ? "Συμμόρφωση" : "Compliance",
      action: () => onNavigate("/compliance/haccp"),
      icon: Shield,
      shortcut: "Ctrl+H",
    },
    {
      id: "iso",
      title: "ISO Standards",
      description: language === "el" ? "Πρότυπα ISO" : "ISO Standards",
      category: language === "el" ? "Συμμόρφωση" : "Compliance",
      action: () => onNavigate("/compliance/iso"),
      icon: FileText,
      shortcut: "Ctrl+I",
    },
  ];

  const filteredCommands = commands.filter(
    (command) =>
      command.title.toLowerCase().includes(query.toLowerCase()) ||
      command.description.toLowerCase().includes(query.toLowerCase()),
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open command palette
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
        return;
      }

      // Global shortcuts when palette is closed
      if (!isOpen) {
        const shortcut = `${e.ctrlKey ? "Ctrl+" : ""}${e.key.toUpperCase()}`;
        const command = commands.find((cmd) => cmd.shortcut === shortcut);
        if (command) {
          e.preventDefault();
          command.action();
          return;
        }
      }

      // Navigation when palette is open
      if (isOpen) {
        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            setSelectedIndex((prev) =>
              prev < filteredCommands.length - 1 ? prev + 1 : 0,
            );
            break;
          case "ArrowUp":
            e.preventDefault();
            setSelectedIndex((prev) =>
              prev > 0 ? prev - 1 : filteredCommands.length - 1,
            );
            break;
          case "Enter":
            e.preventDefault();
            if (filteredCommands[selectedIndex]) {
              filteredCommands[selectedIndex].action();
              setIsOpen(false);
            }
            break;
          case "Escape":
            e.preventDefault();
            setIsOpen(false);
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, commands, onNavigate]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const groupedCommands = filteredCommands.reduce(
    (groups, command) => {
      const category = command.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(command);
      return groups;
    },
    {} as Record<string, CommandItem[]>,
  );

  return (
    <>
      {/* Global shortcut hint */}
      <Button
        variant="outline"
        className="w-64 justify-between text-sm text-muted-foreground"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4" />
          {language === "el" ? "Αναζήτηση..." : "Search..."}
        </div>
        <div className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">⌘</kbd>
          <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">K</kbd>
        </div>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl p-0 gap-0">
          <div className="border-b p-4">
            <div className="flex items-center gap-3">
              <CommandIcon className="w-5 h-5 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  language === "el"
                    ? "Αναζήτηση εντολών..."
                    : "Search commands..."
                }
                className="border-0 focus-visible:ring-0 text-base bg-transparent"
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {Object.keys(groupedCommands).length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">
                  {language === "el"
                    ? "Δεν βρέθηκαν αποτελέσματα"
                    : "No results found"}
                </p>
              </div>
            ) : (
              Object.entries(groupedCommands).map(([category, items]) => (
                <div key={category} className="p-2">
                  <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {category}
                  </div>
                  {items.map((command, index) => {
                    const globalIndex = filteredCommands.indexOf(command);
                    const isSelected = globalIndex === selectedIndex;
                    const Icon = command.icon;

                    return (
                      <button
                        key={command.id}
                        className={`
                          w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors
                          ${
                            isSelected
                              ? "bg-accent text-accent-foreground"
                              : "hover:bg-accent/50"
                          }
                        `}
                        onClick={() => {
                          command.action();
                          setIsOpen(false);
                        }}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                      >
                        <div className="p-1.5 rounded-md bg-muted">
                          <Icon className="w-4 h-4" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">
                            {command.title}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {command.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          {command.shortcut && (
                            <span className="text-xs text-muted-foreground font-mono">
                              {command.shortcut}
                            </span>
                          )}
                          <ArrowRight className="w-3 h-3 text-muted-foreground" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          <div className="border-t p-3 text-xs text-muted-foreground flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-muted rounded">↑↓</kbd>
                {language === "el" ? "πλοήγηση" : "navigate"}
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-muted rounded">↵</kbd>
                {language === "el" ? "επιλογή" : "select"}
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-muted rounded">esc</kbd>
                {language === "el" ? "κλείσιμο" : "close"}
              </span>
            </div>
            <div>
              {filteredCommands.length}{" "}
              {language === "el" ? "αποτελέσματα" : "results"}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CommandPaletteSystem;
