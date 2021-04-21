export const fetchModes = async () => {
  return await fetch('https://demo1030918.mockable.io/')
    .then(res => res.json())
    .then(result => result)
}