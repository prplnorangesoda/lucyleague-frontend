const Permissions = Object.freeze({
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

let this_module = {};
this_module.hot = 'hi';

/**
 * A set of permissions a user can have.
 * @typedef {Object} Permissions
 * @property {boolean} ADMIN
 * @property {boolean} SETPERMISSIONS - Set permissions for other users
 * @property {boolean} CREATELEAGUE - Create new leagues and edit existing.
 * @property {boolean} CREATEGAME - Create new games and edit existing.
 *
 */
/**
 * Takes in a permission bitfield and returns all permissions.
 *
 * @param {number} bin The integer bitfield of user permissions.
 * @returns {Permissions} All applicable permissions for this user.
 */
this_module.from_bitfield = function (bin) {
	let user_permissions = {
		ADMIN: false,
		SETPERMISSIONS: false,
		CREATELEAGUE: false,
		CREATEGAME: false,
	};

	if (bin & Permissions.ADMIN) {
		user_permissions.ADMIN = true;
	}

	if (bin & Permissions.SETPERMISSIONS) {
		user_permissions.SETPERMISSIONS = true;
	}

	if (bin & Permissions.CREATELEAGUE) {
		user_permissions.CREATELEAGUE = true;
	}

	if (bin & Permissions.CREATEGAME) {
		user_permissions.CREATEGAME = true;
	}

	return user_permissions;
};

export default this_module;
