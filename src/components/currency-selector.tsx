import * as React from "react";
import { IconCurrency, IconRefresh } from "@tabler/icons-react";
import { useNav } from "@/context/nav-context";
import { expenseApi } from "@/services/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCurrencySymbol } from "@/lib/utils";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// All supported currencies
const SUPPORTED_CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "INR",
  "AED",
  "AFN",
  "ALL",
  "AMD",
  "ANG",
  "AOA",
  "ARS",
  "AUD",
  "AWG",
  "AZN",
  "BAM",
  "BBD",
  "BDT",
  "BGN",
  "BHD",
  "BIF",
  "BMD",
  "BND",
  "BOB",
  "BRL",
  "BSD",
  "BTN",
  "BWP",
  "BYN",
  "BZD",
  "CAD",
  "CDF",
  "CHF",
  "CLP",
  "CNY",
  "COP",
  "CRC",
  "CUP",
  "CVE",
  "CZK",
  "DJF",
  "DKK",
  "DOP",
  "DZD",
  "EGP",
  "ERN",
  "ETB",
  "FJD",
  "FKP",
  "FOK",
  "GEL",
  "GGP",
  "GHS",
  "GIP",
  "GMD",
  "GNF",
  "GTQ",
  "GYD",
  "HKD",
  "HNL",
  "HRK",
  "HTG",
  "HUF",
  "IDR",
  "ILS",
  "IMP",
  "IQD",
  "IRR",
  "ISK",
  "JEP",
  "JMD",
  "JOD",
  "KES",
  "KGS",
  "KHR",
  "KMF",
  "KRW",
  "KWD",
  "KYD",
  "KZT",
  "LAK",
  "LBP",
  "LKR",
  "LRD",
  "LSL",
  "LYD",
  "MAD",
  "MDL",
  "MGA",
  "MKD",
  "MMK",
  "MNT",
  "MOP",
  "MRU",
  "MUR",
  "MVR",
  "MWK",
  "MXN",
  "MYR",
  "MZN",
  "NAD",
  "NGN",
  "NIO",
  "NOK",
  "NPR",
  "NZD",
  "OMR",
  "PAB",
  "PEN",
  "PGK",
  "PHP",
  "PKR",
  "PLN",
  "PYG",
  "QAR",
  "RON",
  "RSD",
  "RUB",
  "RWF",
  "SAR",
  "SBD",
  "SCR",
  "SDG",
  "SEK",
  "SGD",
  "SHP",
  "SLE",
  "SLL",
  "SOS",
  "SRD",
  "SSP",
  "STN",
  "SYP",
  "SZL",
  "THB",
  "TJS",
  "TMT",
  "TND",
  "TOP",
  "TRY",
  "TTD",
  "TWD",
  "TZS",
  "UAH",
  "UGX",
  "UYU",
  "UZS",
  "VES",
  "VND",
  "VUV",
  "WST",
  "XAF",
  "XCD",
  "XOF",
  "XPF",
  "YER",
  "ZAR",
  "ZMW",
  "ZWL",
];

interface CurrencySelectorProps {
  onCurrencyChange?: (expenses: any[]) => void;
}

export function CurrencySelector({ onCurrencyChange }: CurrencySelectorProps) {
  const { selectedCurrency, setSelectedCurrency } = useNav();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleCurrencyChange = async (newCurrency: string) => {
    if (newCurrency === selectedCurrency) return;

    setIsLoading(true);
    try {
      const convertedExpenses = await expenseApi.convertCurrency(newCurrency);
      setSelectedCurrency(newCurrency);
      if (convertedExpenses.length > 0) {
        onCurrencyChange?.(convertedExpenses);
        toast.success(
          `Converted to ${newCurrency} ${getCurrencySymbol(newCurrency)}`,
        );
      }
    } catch (error) {
      toast.error("Failed to convert currency");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const currencySymbol = getCurrencySymbol(selectedCurrency);

  return (
    <TooltipProvider>
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between px-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Currency
          </label>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://www.exchangerate-api.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                by ExchangeRate-API
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Live exchange rates powered by ExchangeRate-API</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Select
          value={selectedCurrency}
          onValueChange={handleCurrencyChange}
          disabled={isLoading}
        >
          <SelectTrigger className="w-full bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 hover:border-primary/40 transition-all">
            <div className="flex items-center gap-2">
              <IconCurrency className="h-4 w-4 text-primary" />
              <SelectValue />
              <span className="text-lg font-bold text-primary ml-auto">
                {currencySymbol}
              </span>
            </div>
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {SUPPORTED_CURRENCIES.map((currency) => (
              <SelectItem
                key={currency}
                value={currency}
                className="flex items-center gap-2"
              >
                <span className="font-medium">{currency}</span>
                <span className="text-muted-foreground ml-2">
                  {getCurrencySymbol(currency)}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {isLoading && (
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground py-2">
            <IconRefresh className="h-3 w-3 animate-spin" />
            Converting rates...
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
