<?php
namespace App\Controller;

class HomeController extends BaseController
{
    public function index()
    {
        $data = [
            'hello' => 'Hello, World!'
        ];

        $this->template->render(['header_common.html', 'view_index.html', 'footer_common.html'], $data);
    }
}
