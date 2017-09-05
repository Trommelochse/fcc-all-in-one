export function getFavorites() {
  let favorites = localStorage.getItem('favorites');
  if (!favorites) {return};
  favorites = favorites.split(',');
  return favorites;
}

export function setFavorites(favorites) {
  if (!favorites) {
    return
  }
  favorites = favorites.join(',');
  localStorage.setItem('favorites', favorites)
}
