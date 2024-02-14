export function methodDeleteIdToTheDTO(dt) {
  const id = dt.id;
  delete dt.id;
  return [id, dt]
}
