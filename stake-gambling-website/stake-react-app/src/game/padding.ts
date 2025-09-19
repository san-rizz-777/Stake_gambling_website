export const DECIMAL_MULTIPLIER = 10000;   //Some decimal number to get a integer.

export function pad(n: number)
{
return n*DECIMAL_MULTIPLIER;       //Just padding the decimal to avoid the round-off/pprecision error 
}

export function unpad(n : number)
{
return Math.floor(n/DECIMAL_MULTIPLIER);
}