declare global {
  interface Window {
    __bookshelf: {
      purgeUsers: () => void
      purgeListItems: () => void
    }
  }
}

export {}
