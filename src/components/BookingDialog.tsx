import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().min(7, "Enter a valid phone").max(25),
  email: z.string().trim().email("Enter a valid email").max(120),
  property: z.string().min(1, "Select a property type"),
  cameras: z.string().min(1, "Select an estimate"),
  notes: z.string().max(500).optional(),
});

interface Props {
  trigger: React.ReactNode;
  defaultOpen?: boolean;
}

export function BookingDialog({ trigger, defaultOpen }: Props) {
  const [open, setOpen] = useState(!!defaultOpen);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form);
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("https://formsubmit.co/ajax/info@ismartsecurity.co.uk", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New site survey request — ${parsed.data.name}`,
          _template: "table",
          _captcha: "false",
          Name: parsed.data.name,
          Phone: parsed.data.phone,
          Email: parsed.data.email,
          "Property type": parsed.data.property,
          "Cameras needed": parsed.data.cameras,
          Notes: parsed.data.notes || "—",
        }),
      });
      if (!res.ok) throw new Error(`FormSubmit responded ${res.status}`);
      setSubmitted(true);
    } catch {
      toast.error("Sorry, something went wrong sending your request. Please call us on 07961 297155.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setSubmitted(false); }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        {submitted ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-brand-red" />
            <h3 className="mt-4 text-2xl">Site visit booked</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              A specialist will call you within 2 business hours to confirm your free on-site survey.
            </p>
            <Button className="mt-6" onClick={() => setOpen(false)}>Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-3xl">Book a free site survey</DialogTitle>
              <DialogDescription>
                Tell us about your property. We'll design a system and quote — no obligation.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit} className="grid gap-4 pt-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" name="name" required maxLength={80} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" type="tel" required maxLength={25} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required maxLength={120} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="property">Property type</Label>
                  <Select name="property" required>
                    <SelectTrigger id="property"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">Home</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="retail">Retail / Shop</SelectItem>
                      <SelectItem value="warehouse">Warehouse / Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cameras">Cameras needed</Label>
                  <Select name="cameras" required>
                    <SelectTrigger id="cameras"><SelectValue placeholder="Estimate" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-4">1 – 4</SelectItem>
                      <SelectItem value="5-8">5 – 8</SelectItem>
                      <SelectItem value="9-16">9 – 16</SelectItem>
                      <SelectItem value="17+">17+</SelectItem>
                      <SelectItem value="unsure">Not sure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea id="notes" name="notes" rows={3} maxLength={500} placeholder="Tell us about your site or concerns..." />
              </div>
              <Button type="submit" disabled={loading} className="bg-accent text-accent-foreground hover:bg-brand-red-deep h-11 text-base">
                {loading ? "Sending..." : "Request my free survey"}
              </Button>
              <p className="text-center text-xs text-muted-foreground">No spam. Your details stay with iSmart Security.</p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
