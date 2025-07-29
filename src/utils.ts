export const getSocioeconomicStatus = (postalCode: string) => {
    if (!postalCode) return '';
    const statuses = ['Hoog', 'Middel', 'Laag']; // Dutch terms
    const index = postalCode.charCodeAt(0) % 3;
    return statuses[index];
  };

export const getDisplayName = (code: string) => {
    return code.startsWith('1') ? `Patiënt ${code}` : `Zorgverlener ${code}`;
};
