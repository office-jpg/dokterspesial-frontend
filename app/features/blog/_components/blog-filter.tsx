import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ChevronDown, Search, X } from "lucide-react";

import { Badge } from "~/components/atoms/badge";
import { Button } from "~/components/atoms/button";
import { Checkbox } from "~/components/atoms/checkbox";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "~/components/atoms/command";
import { Input } from "~/components/atoms/input";
import { Label } from "~/components/atoms/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/atoms/popover";
import { cn } from "~/lib/utils";
import { useBlogFilterStore } from "~/stores/blog-filter-store";
import { type Category } from "~/types";

interface BlogFilterProps {
    categories: Category[];
    blogData?: { id: number; category: string; title: string }[];
    allBlogsData?: { id: number; category: string; title: string }[];
}

interface UpdatedBlogCategory {
    id: number;
    name: string;
    count: string;
    isAllSelected?: boolean;
}

const BlogFilter: React.FC<BlogFilterProps> = memo(
    ({ categories, blogData = [], allBlogsData }) => {
        const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

        const dataForCounting = allBlogsData || blogData;

        const {
            searchTerm,
            selectedCategories,
            setSearchTerm,
            setSelectedCategories,
            initializeCategories,
            setAllAvailableCategories,
        } = useBlogFilterStore();

        useEffect(() => {
            if (categories.length > 0) {
                const allCategoryNames = categories.map((cat) => cat.name);
                setAllAvailableCategories(allCategoryNames);
                initializeCategories(allCategoryNames);
            }
        }, [categories, initializeCategories, setAllAvailableCategories]);

        useEffect(() => {
            return () => {
                if (searchTimeoutRef.current) {
                    clearTimeout(searchTimeoutRef.current);
                }
            };
        }, []);

        const updatedCategories = useMemo(() => {
            const getCategoryCount = (categoryName: string) => {
                if (!dataForCounting.length) return 0;

                let filtered = [...dataForCounting];

                if (searchTerm && searchTerm.trim()) {
                    filtered = filtered.filter(
                        (blog) =>
                            blog.title
                                ?.toLowerCase()
                                .includes(searchTerm.toLowerCase()) ||
                            blog.category
                                ?.toLowerCase()
                                .includes(searchTerm.toLowerCase())
                    );
                }

                if (categoryName === "") {
                    return filtered.length;
                }

                return filtered.filter((blog) => blog.category === categoryName)
                    .length;
            };

            const categoriesWithCount = categories.map((category) => ({
                ...category,
                count: getCategoryCount(category.name).toString(),
            }));

            return [
                {
                    id: 0,
                    name: "",
                    blogs_count: getCategoryCount(""),
                    count: getCategoryCount("").toString(),
                },
                ...categoriesWithCount,
            ];
        }, [categories, dataForCounting, searchTerm]);

        const handleSearchChange = useCallback(
            (value: string) => {
                setSearchTerm(value);

                if (searchTimeoutRef.current) {
                    clearTimeout(searchTimeoutRef.current);
                }

                searchTimeoutRef.current = setTimeout(() => {}, 500);
            },
            [setSearchTerm]
        );

        const CategoryMultiSelect = ({
            options,
            selected,
            onSelectionChange,
            placeholder,
        }: {
            options: UpdatedBlogCategory[];
            selected: string[];
            onSelectionChange: (value: string[]) => void;
            placeholder: string;
        }) => {
            const [open, setOpen] = useState(false);

            const handleSelect = (optionName: string) => {
                if (optionName === "") {
                    const allOptions = options
                        .filter((opt) => opt.name !== "")
                        .map((opt) => opt.name);
                    const isAllSelected =
                        allOptions.length === selected.length &&
                        allOptions.every((opt) => selected.includes(opt));

                    if (isAllSelected) {
                        onSelectionChange([]);
                    } else {
                        onSelectionChange(allOptions);
                    }
                } else {
                    const newSelected = selected.includes(optionName)
                        ? selected.filter((item) => item !== optionName)
                        : [...selected, optionName];
                    onSelectionChange(newSelected);
                }
            };

            const getDisplayText = () => {
                if (selected.length === 0) {
                    return (
                        <span className="text-muted-foreground">
                            {placeholder}
                        </span>
                    );
                } else if (selected.length <= 2) {
                    return selected.map((item) => (
                        <Badge
                            key={item}
                            variant="secondary"
                            className="text-xs"
                        >
                            {item}
                        </Badge>
                    ));
                } else {
                    return (
                        <Badge variant="secondary" className="text-xs">
                            {selected.length} kategori dipilih
                        </Badge>
                    );
                }
            };

            return (
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                        >
                            <div className="flex flex-1 flex-wrap gap-1">
                                {getDisplayText()}
                            </div>
                            <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                        <Command>
                            <CommandInput placeholder="Cari kategori..." />
                            <CommandList>
                                <CommandEmpty>
                                    Tidak ada kategori ditemukan.
                                </CommandEmpty>
                                <CommandGroup>
                                    {options.map((option, index) => (
                                        <CommandItem
                                            key={`category-${index}`}
                                            value={option.name}
                                            onSelect={() =>
                                                handleSelect(option.name)
                                            }
                                        >
                                            <Checkbox
                                                checked={
                                                    option.name === ""
                                                        ? options
                                                              .filter(
                                                                  (opt) =>
                                                                      opt.name !==
                                                                      ""
                                                              )
                                                              .every((opt) =>
                                                                  selected.includes(
                                                                      opt.name
                                                                  )
                                                              )
                                                        : selected.includes(
                                                              option.name
                                                          )
                                                }
                                                className="mr-2"
                                            />
                                            <span className="flex-1">
                                                {option.name === ""
                                                    ? "Semua Kategori"
                                                    : option.name}
                                            </span>
                                            <Badge
                                                variant="outline"
                                                className="ml-auto text-xs"
                                            >
                                                {option.count}
                                            </Badge>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            );
        };

        return (
            <div className="w-full space-y-4">
                <div className="relative">
                    <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                    <Input
                        type="text"
                        placeholder="Cari artikel..."
                        className="pl-10"
                        value={searchTerm || ""}
                        onChange={(e) => handleSearchChange(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
                    <div>
                        <Label className="mb-2 block text-sm font-medium">
                            Kategori
                        </Label>
                        <CategoryMultiSelect
                            options={updatedCategories}
                            selected={selectedCategories}
                            onSelectionChange={setSelectedCategories}
                            placeholder="Pilih kategori"
                        />
                    </div>
                </div>
            </div>
        );
    }
);

BlogFilter.displayName = "BlogFilter";

export default BlogFilter;
