export const traducirEtiqueta = (label: string): string => {
  const traducciones: { [key: string]: string } = {
    CARDBOARD: "CARTÓN",
    GLASS: "VIDRIO",
    METAL: "METAL",
    PAPER: "PAPEL",
    PLASTIC: "PLÁSTICO",
    TRASH: "BASURA",
    ERROR: "ERROR"
  };
  return traducciones[label] || label;
};