<?php

namespace App\Controller;

use App\Entity\Ingredient;
use App\Form\IngredientType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class IngredientController extends AbstractController
{
    /**
     * @Route("/ingredient", name="app_ingredient")
     */
    public function index(Request $request, EntityManagerInterface $manager): Response
    {
        $ingredient = new Ingredient();

        $form = $this->createForm(IngredientType::class, $ingredient, [
            "user" => $this->getUser(),
        ]);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $ingredient = $form->getData();
            $manager->persist($ingredient);
            $manager->flush();
            $this->addFlash(
                'success',
                "Ingrédient ajouté"
            );
            return $this->redirectToRoute("app_ingredient");
        }

        return $this->render('ingredient/index.html.twig', [
            'controller_name' => 'Ingrédients',
            "ingredients" => $this->getUser()->getIngredients()->getValues(),
            "form" => $form->createView(),
        ]);
    }

    /**
     * @Route("/ingredient/edit/{id}", name="app_ingredient_edit")
     */
    public function edit(Request $request, EntityManagerInterface $manager, Ingredient $ingredient): Response
    {
        if($ingredient == null) {
            return new JsonResponse("Ingredient doesnt exist");
        }

        if($ingredient->getCategory()->getUser() != $this->getUser()) {
            throw $this->createAccessDeniedException();
        }

        $form = $this->createForm(IngredientType::class, $ingredient, [
            "user" => $this->getUser(),
        ]);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $ingredient = $form->getData();

            $manager->persist($ingredient);
            $manager->flush();
            $this->addFlash(
                'success',
                'ingrédient mis à jour'
            );
        }

        return $this->render('ingredient/edit.html.twig', [
            'controller_name' => "Editer l'ingrédient",
            "form" => $form->createView(),
            'referer' => $this->generateUrl("app_ingredient"),
        ]);
    }

    /**
     * @Route("/ingredient/remove/{id}", name="app_ingredient_remove")
     */
    public function remove(Request $request, EntityManagerInterface $manager, Ingredient $ingredient = null): Response
    {
        if($ingredient == null) {
            return new JsonResponse("Table doesnt exist");
        }

        if ($ingredient->getCategory()->getUser() != $this->getUser()) {
            throw $this->createAccessDeniedException();
        }

        $manager->remove($ingredient);
        $manager->flush();
        $this->addFlash(
            'success',
            'Ingrédient supprimé'
        );
        return $this->redirect($request->headers->get('referer'));
    }
}
