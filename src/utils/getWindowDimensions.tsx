export function getWindowDimensions(width:number) : number {
 
  let nb_col = 4;
  const a = -1;
  
  if (width < 451) nb_col = 2;
  if (width > 450 && width < 600) nb_col = 3 + a;
  if (width > 600 && width < 800) nb_col = 4 + a;
  if (width > 800 && width < 900) nb_col = 5 + a;
  if (width > 900 && width < 1000) nb_col = 6 + a;
  if (width > 1000 && width < 1100) nb_col = 7 + a;
  if (width > 1000 && width < 1200) nb_col = 8 + a;
  if (width > 1200) nb_col = 10;
  return nb_col
}

