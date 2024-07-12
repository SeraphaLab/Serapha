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

    public function store($id)
    {
        $data = [
            'hello' => 'API Controller',
        ];

        return $this->json($data);
    }
}
