import React from 'react'
import NextLink from 'next/link'

export const CustomLink = ({ href, children, ...props }) => {
  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  )
}

export default CustomLink
