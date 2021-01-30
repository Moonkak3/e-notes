import {Router} from 'express';
import {auth} from "firebase-admin";
import {checkAdmin, checkUser, getUser} from '../../utils';

const users = Router();

users.get("/", checkUser, async (req, res) => auth().listUsers(1000).then((list: auth.ListUsersResult) => res.json({
    users: list.users.map(user => ({
        uid: user.uid, email: user.email, name: user.displayName, pfp: user.photoURL || ""
    })), token: list.pageToken
})));

users.get("/:uid", checkUser, async (req, res) => {
    try {
        if (req.params.uid === 'me') res.json(req.body.user);
        else res.json(await getUser(req.params.uid));
    } catch (e) {
        res.status(500).send("failed_to_get_user")
    }
});

// { target:'CS3132', to:true}
users.post("/:uid/admin/setperm", checkAdmin, async (req, res) => {
    try {
        const user = await getUser(req.params.uid);
        await user.setPermission(req.body.perm, req.body.to);
        res.json(user);
    } catch (e) {
        res.status(500).send("failed")
    }
});

users.post("/:uid/admin/setperms", checkAdmin, async (req, res) => {
    try {
        const user = await getUser(req.params.uid);
        await user.setPermissions(req.body);
        res.json(user);
    } catch (e) {
        res.status(500).send("failed")
    }
});

users.post("/:uid/admin/role", checkAdmin, async (req, res) => {
    try {
        const user = await getUser(req.params.uid);
        await user.addRole(req.body.rid);
        res.json(user);
    } catch (e) {
        res.status(500).send("failed")
    }
});

export default users;