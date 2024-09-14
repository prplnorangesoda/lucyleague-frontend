const Permssions = Object.freeze({
    ADMIN: 1,
    SETPERMISSIONS: 2,
    CREATELEAGUE: 3,
    CREATEGAME: 4,
})

export function ParseUserForPerms( bin ) {
    var user_permissions = {
        ADMIN: false,
        SETPERMISSIONS: false,
        CREATELEAGUE: false,
        CREATEGAME: false,
    }
    
    if (bin & Permissions.ADMIN) {
        user_permissions.ADMIN = true 
    }

    if (bin & Permissions.SETPERMISSIONS) {
        user_permissions.SETPERMISSIONS = true 
    }

    if (bin & Permissions.CREATELEAGUE) {
        user_permissions.CREATELEAGUE = true 
    }

    if (bin & Permissions.CREATEGAME ) {
        user_permissions.CREATEGAME = true
    }

    return user_permissions
}

