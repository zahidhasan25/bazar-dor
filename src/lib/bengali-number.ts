const BANGLA_DIGITS = "০১২৩৪৫৬৭৮৯";

export function toBengaliNumber(value: number | string) {
  return String(value).replace(/[0-9]/g, (digit) => {
    return BANGLA_DIGITS[Number(digit)];
  });
}

export function formatBengaliNumber(value: number | string) {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return String(value);
  }

  return new Intl.NumberFormat("en-IN")
    .format(number)
    .replace(/[0-9]/g, (digit) => {
      return BANGLA_DIGITS[Number(digit)];
    });
}

export function unitName(unit: string) {
  switch (unit) {
    case "kg":
      return "প্রতি কেজি";

    case "litre":
      return "প্রতি লিটার";

    case "dozen":
      return "প্রতি ডজন";

    case "piece":
      return "প্রতি পিস";

    default:
      return unit;
  }
}