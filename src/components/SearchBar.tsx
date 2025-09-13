import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // TODO: Implement search functionality
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search government schemes (e.g., PM Kisan, Housing schemes...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 pr-4 py-3 text-base bg-search-bg border-border focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <Button 
          onClick={handleSearch}
          className="ml-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Search
        </Button>
      </div>
      
      {/* Popular searches */}
      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        <span className="text-muted-foreground">Popular:</span>
        {["PM Kisan", "Housing", "Employment", "Education"].map((term) => (
          <button
            key={term}
            onClick={() => setSearchQuery(term)}
            className="text-accent hover:text-accent/80 hover:underline"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;