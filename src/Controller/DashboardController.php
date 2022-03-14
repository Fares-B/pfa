<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractController
{

    /**
     * @Route("/", name="home")
     */
    public function index(): Response
    {
        return $this->redirectToRoute("app_dashboard");
    }
    /**
     * @Route("/dashboard", name="app_dashboard")
     */
    public function dashboard(): Response
    {
        return $this->render('dashboard/index.html.twig', [
            'controller_name' => 'DashboardController',
        ]);
    }
}
