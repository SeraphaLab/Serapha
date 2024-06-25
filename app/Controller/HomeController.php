<?php
namespace App\Controller;

use Serapha\Helper\Str;

class HomeController extends BaseController
{
    public function index()
    {
        $data = [
            'hello' => Str::limit('Hello, World!', 5),
        ];

        $this->template->render(['header_common.html', 'view_index.html', 'footer_common.html'], $data);
    }
}
