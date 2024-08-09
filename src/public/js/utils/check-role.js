const isAdministrator = (isAdmin) => {
    return isAdmin === 2;
}

const isUser = (isAdmin) => {
    return isAdmin === 0 || isAdmin === false;
}

const isStaff = (isAdmin) => {
    return isAdmin === 1 || isAdmin === true;
}

export { isAdministrator, isUser, isStaff };