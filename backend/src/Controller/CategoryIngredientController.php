<?php

namespace App\Controller;

use App\Entity\CategoryIngredient;
use App\Form\CategoryIngredientType;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CategoryIngredientController extends AbstractController
{
    /**
     * @Route("/category_ingredient", name="app_category_ingredient")
     */
    public function index(Request $request, EntityManagerInterface $manager): Response
    {
        $categoryIngredients = $this->getUser()->getCategoryIngredients();

        $categoryIngredient = new CategoryIngredient();

        $form = $this->createForm(CategoryIngredientType::class, $categoryIngredient);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $categoryIngredient = $form->getData();
            $categoryIngredient->setUser($this->getUser());
            $manager->persist($categoryIngredient);
            $manager->flush();
            $this->addFlash(
                'success',
                "Categorie d'ingrédient ajouté"
            );
            return $this->redirectToRoute("app_category_ingredient");
        }

        return $this->render('category_ingredient/index.html.twig', [
            'controller_name' => 'Ingrédient - Catégories',
            "categoryIngredients" => $categoryIngredients,
            "form" => $form->createView(),
        ]);
    }

    /**
     * @Route("/category_ingredient/edit/{id}", name="app_category_ingredient_edit")
     */
    public function edit(Request $request, EntityManagerInterface $manager, CategoryIngredient $categoryIngredient): Response
    {
               
        if($categoryIngredient == null) {
            return new JsonResponse("Category ingredient doesnt exist");
        }

        if ($categoryIngredient->getUser() !== $this->getUser()) {
            throw $this->createAccessDeniedException();
        }
        $form = $this->createForm(CategoryIngredientType::class, $categoryIngredient);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $categoryIngredient = $form->getData();

            $manager->persist($categoryIngredient);
            $manager->flush();
            $this->addFlash(
                'success',
                'categorie ingrédient mis à jour'
            );
        }

        return $this->render('category_ingredient/edit.html.twig', [
            'controller_name' => 'Editer la catégorie des ingrédients',
            "form" => $form->createView(),
            'referer' => $this->generateUrl("app_category_ingredient"),
        ]);
    }

    /**
     * @Route("/category_ingredient/remove/{id}", name="app_category_ingredient_remove")
     */
    public function remove(Request $request, EntityManagerInterface $manager, CategoryIngredient $categoryIngredient = null): Response
    {
        if($categoryIngredient == null) {
            return new JsonResponse("Table doesnt exist");
        }

        if ($categoryIngredient->getUser() != $this->getUser()) {
            throw $this->createAccessDeniedException();
        }

        $manager->remove($categoryIngredient);
        $manager->flush();
        $this->addFlash(
            'success',
            "Catégorie d'ingrédient supprimée"
        );
        return $this->redirect($request->headers->get('referer'));
    }
}
