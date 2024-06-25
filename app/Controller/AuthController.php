<?php
namespace App\Controller;

class AuthController extends BaseController
{
    public function index()
    {
        $data = [
            'hello' => 'Login Page',
        ];

        $this->template->render(['header_common.html', 'view_index.html', 'footer_common.html'], $data);
    }
}
