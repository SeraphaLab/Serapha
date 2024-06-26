<?php
namespace App\Model;

use Serapha\Model\Model;

class UserModel extends Model
{
    public function createUser(array $data)
    {
        $query = 'INSERT INTO user (username, password, group_id, language, online_status, last_login, join_date) VALUES (?,?,?,?,?,?,?)';
        $bindTypes = 'ssisiii';
        $user_data = [
            'username' => $data['username'],
            'password' => $data['password'],
            'group_id' => $data['group_id'],
            'language' => $data['language'],
            'online_status' => $data['online_status'],
            'last_login' => $data['last_login'],
            'join_date' => $data['join_date']
        ];

        return $this->db->create($query, $bindTypes, $user_data);
    }

    public function getUserById(int $id)
    {
        $query = 'SELECT * FROM user WHERE uid = ?';
        $bindTypes = 'i';

        return $this->db->read($query, $bindTypes, ['uid' => $id]);
    }

    public function updateUser(array $data, int $id)
    {
        $query = 'UPDATE user SET username = ?, password = ?, group_id = ?, language = ?, online_status = ?, last_login = ?, join_date = ? WHERE uid = ?';
        $bindTypes = 'ssisiiii';
        $user_data = [
            $data['username'], 
            $data['password'], 
            $data['group_id'], 
            $data['language'], 
            $data['online_status'], 
            $data['last_login'], 
            $data['join_date'], 
            $id
        ];

        return $this->db->update($query, $bindTypes, $user_data);
    }

    public function deleteUser(int $id)
    {
        $query = 'DELETE FROM user WHERE uid = ?';
        $bindTypes = 'i';

        return $this->db->delete($query, $bindTypes, ['uid' => $id]);
    }
}
