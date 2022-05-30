<?php

namespace App\Controller;

use App\Entity\Establishment;
use App\Form\EstablishmentType;
use App\Repository\EstablishmentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class EstablishmentController extends AbstractController
{

    /**
     * @Route("/establishment", name="app_establishment")
     */
    public function index(Request $request, EntityManagerInterface $manager): Response
    {
        $user = $this->getUser();
        // just set up a fresh $task object (remove the example data)
        $establishment = new Establishment();

        $form = $this->createForm(EstablishmentType::class, $establishment);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $establishment = $form->getData();
            $establishment->setUser($user);

            $manager->persist($establishment);
            $manager->flush();
            $this->addFlash(
                'success',
                'Etablissement ajouté'
            );
            return $this->redirectToRoute('app_establishment');
        }

        return $this->render('establishment/index.html.twig', [
            'controller_name' => 'Etablissement',
            "establishments" => $user->getEstablishments(),
            "form" => $form->createView(),
        ]);
    }

    /**
     * @Route("/establishment/edit/{id}", name="app_establishment_edit")
     */
    public function edit(Request $request, EntityManagerInterface $manager, Establishment $establishment=null): Response
    {        
        if($establishment == null) {
            return new JsonResponse("Ingredient doesnt exist");
        }

        if ($establishment->getUser() != $this->getUser()) {
            throw $this->createAccessDeniedException();
        }

        $form = $this->createForm(EstablishmentType::class, $establishment);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $establishment = $form->getData();

            $manager->persist($establishment);
            $manager->flush();
            $this->addFlash(
                'success',
                'Etablissement mis à jour'
            );
        }

        return $this->render('establishment/edit.html.twig', [
            'controller_name' => 'Editer établissement',
            "form" => $form->createView(),
        ]);
    }

    /**
     * @Route("/establishment/remove/{id}", name="app_establishment_remove")
     */
    public function remove(Request $request, EntityManagerInterface $manager, Establishment $establishment): Response
    {
        if($establishment == null) {
            return new JsonResponse("Ingredient doesnt exist");
        }

        if($establishment->getUser() != $this->getUser()) {
            throw $this->createAccessDeniedException();
        }

        $manager->remove($establishment);
        $manager->flush();
        return $this->redirectToRoute('app_establishment');
    }
}
