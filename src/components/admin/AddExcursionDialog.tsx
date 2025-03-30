
import React from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(3, { message: "Excursion name must be at least 3 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  price: z.string().min(1, { message: "Price is required" }),
  duration: z.string().min(1, { message: "Duration is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  availability: z.boolean().default(true),
  featured: z.boolean().default(false),
  image: z.instanceof(File).optional(),
});

export function AddExcursionDialog() {
  const [open, setOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      price: "",
      duration: "",
      description: "",
      availability: true,
      featured: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real application, this would make an API call to create the excursion
    console.log("Creating excursion:", values);
    
    toast({
      title: "Excursion created",
      description: `Successfully created excursion: ${values.name}`,
    });
    
    setOpen(false);
    form.reset();
    setPreviewImage(null);
  }

  // Categories sample data
  const categories = [
    { id: "desert-tours", name: "Desert Tours" },
    { id: "mountain-expeditions", name: "Mountain Expeditions" },
    { id: "cultural-tours", name: "Cultural Tours" },
    { id: "wildlife-safari", name: "Wildlife Safari" },
    { id: "overnight-adventures", name: "Overnight Adventures" },
  ];

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      form.setValue("image", file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Add Excursion</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Excursion</DialogTitle>
          <DialogDescription>
            Create a new excursion for your customers.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excursion Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Desert Safari Adventure" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. $299" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 1 day" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe this excursion..." 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Available</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        This excursion is available for booking
                      </p>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Show this excursion on the homepage
                      </p>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            
            <FormItem>
              <FormLabel>Excursion Image</FormLabel>
              <FormControl>
                <Input 
                  type="file" 
                  accept="image/*" 
                  className="cursor-pointer"
                  onChange={handleImageChange}
                />
              </FormControl>
              <FormMessage />
              {previewImage && (
                <div className="mt-2 border rounded-md overflow-hidden">
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="h-40 w-full object-cover"
                  />
                </div>
              )}
            </FormItem>
            
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Excursion</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
