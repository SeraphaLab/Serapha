<?php
namespace App\Controller;

class APIController extends BaseController
{
    public function index()
    {
        $data = [
            'hello' => 'API Controller',
        ];

        return $this->json($data);
    }

    public function param($str)
    {
        $data = [
            'param' => $str,
        ];

        return $this->json($data);
    }

    public function show($id, $name = null)
    
    {
        $data = [
            'id' => $id,
            'name' => $name,
        ];

        return $this->json($data);
    }
}
