<?php

namespace App\Controller;

use App\Form\AccountType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AccountController extends AbstractController
{
    /**
     * @Route("/account", name="app_account")
     */
    public function index(Request $request, EntityManagerInterface $manager): Response
    {
        $account = $this->getUser();
        $form = $this->createForm(AccountType::class, $account);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $account = $form->getData();
            $manager->persist($account);
            $manager->flush();
            $this->addFlash(
                'success',
                "Profil mis à jour"
            );
            return $this->redirectToRoute("app_account");
        }
        return $this->render('account/index.html.twig', [
            'controller_name' => 'Mon compte',
            'form' => $form->createView(),
        ]);
    }
}
