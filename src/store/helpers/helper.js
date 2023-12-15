export function isMatchFilter(driver, filter) {
    if (filter.name) {
        if (!driver.name.toLowerCase().includes(filter.name.toLowerCase())) return false
    }
    if (filter.expFrom) {
        if (filter.expFrom > driver.exp) return false
    }
    if (filter.expTo) {
        if (filter.expTo < driver.exp) return false
    }
    return true
}
