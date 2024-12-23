export const PERMISSIONS = Object.freeze({
	/// Must check for none using ==.
	NONE: 0,
	/// All permissions.
	ADMIN: 1,
	/// Can set permissions for others.
	SETPERMISSIONS: 2,
	/// Can create a new League, and modify existing ones.
	CREATELEAGUE: 4,
	/// Can create a new Game between two teams for an existing League.
	CREATEGAME: 8,
});

export interface Permissions {
	ADMIN: boolean;
	SETPERMISSIONS: boolean;
	CREATELEAGUE: boolean;
	CREATEGAME: boolean;
}
export let from_bitfield = function (bin: number): Permissions {
	let user_permissions = {
		ADMIN: false,
		SETPERMISSIONS: false,
		CREATELEAGUE: false,
		CREATEGAME: false,
	};

	if (bin & PERMISSIONS.ADMIN) {
		user_permissions.ADMIN = true;
	}

	if (bin & PERMISSIONS.SETPERMISSIONS) {
		user_permissions.SETPERMISSIONS = true;
	}

	if (bin & PERMISSIONS.CREATELEAGUE) {
		user_permissions.CREATELEAGUE = true;
	}

	if (bin & PERMISSIONS.CREATEGAME) {
		user_permissions.CREATEGAME = true;
	}

	return user_permissions;
};
