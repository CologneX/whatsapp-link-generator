import { useId, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import countries, { type Country } from "@/lib/countries";

type MobileInputProps = {
  onChange?: (value: string) => void;
  initialCountry?: string;
};

const MobileInput = ({ onChange, initialCountry = "US" }: MobileInputProps) => {
  const id = useId();

  const [selected, setSelected] = useState<string>(initialCountry);
  const [phoneValue, setPhoneValue] = useState<string>("");

  useEffect(() => {
    const entry = countries.find((c) => c.code === selected) as
      | Country
      | undefined;
    const dial = entry?.dial ?? "";
    onChange?.(`${dial} ${phoneValue}`);
  }, [selected, phoneValue, onChange]);

  return (
    <div className="w-full max-w-xs space-y-2">
      <div className="flex shadow-xs">
        <Select defaultValue={initialCountry} onValueChange={setSelected}>
          <SelectTrigger
            id={id}
            className="rounded-r-none shadow-none [&_[data-slot=select-value]_.countryname]:hidden"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-96">
            {countries.map((c) => (
              <SelectItem key={c.code} value={c.code} className="pr-2">
                <div className="flex items-center gap-2">
                  <div className="flag">{c.flag}</div>
                  <div className="countryname">{c.name}</div>
                </div>
                <div className="ml-auto text-right text-sm text-muted-foreground">
                  {c.dial}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          id={id}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="123 456 789"
          value={phoneValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            // keep only digits
            const digits = e.target.value.replace(/\D/g, "");
            setPhoneValue(digits);
          }}
          onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => {
            // sanitize pasted content to digits only
            e.preventDefault();
            const pasted = e.clipboardData.getData("text");
            const digits = pasted.replace(/\D/g, "");
            setPhoneValue((prev) => (prev + digits).replace(/\D/g, ""));
          }}
          className="-me-px rounded-l-none shadow-none focus-visible:z-1"
        />
      </div>
    </div>
  );
};

export default MobileInput;
