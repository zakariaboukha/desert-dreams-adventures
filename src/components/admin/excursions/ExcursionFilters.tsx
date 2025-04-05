
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface ExcursionFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  categories: string[];
}

const ExcursionFilters: React.FC<ExcursionFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  priceRange,
  setPriceRange,
  categories
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex w-full sm:w-96 items-center rounded-md border border-input bg-background px-3 py-1">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search excursions..."
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-1.5"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex items-center gap-2 flex-wrap">
        {/* Category Filter */}
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-32 h-9">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        
        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32 h-9">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        
        {/* Price Range Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="h-4 w-4 mr-1" /> Price Range
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4 p-2">
              <h4 className="font-medium text-sm">Price Range</h4>
              <div className="px-1">
                <Slider 
                  defaultValue={[priceRange[0], priceRange[1]]} 
                  max={500}
                  step={10}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Min Price</Label>
                  <div className="border rounded-md px-2 py-1">
                    ${priceRange[0]}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Max Price</Label>
                  <div className="border rounded-md px-2 py-1">
                    ${priceRange[1]}
                  </div>
                </div>
              </div>
              <Button className="w-full" size="sm">Apply Filter</Button>
            </div>
          </PopoverContent>
        </Popover>
        
        <Button variant="outline" size="sm" className="h-9">
          <Download className="h-4 w-4 mr-1" /> Export
        </Button>
      </div>
    </div>
  );
};

export default ExcursionFilters;
