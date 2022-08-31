export const truncateAddress = (str) => {
  let str1 = str.slice(0, 4)
  let str2 = str.slice(-4)
  let truncatedAddress = str1 + '...' + str2
  return truncatedAddress
}
