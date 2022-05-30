<?php

namespace App\Controller;

use App\Entity\Menu;
use App\Form\MenuType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MenuController extends AbstractController
{
    /**
     * @Route("/menu", name="app_menu")
     */
    public function index(Request $request, EntityManagerInterface $manager): Response
    {
        $categoryMenus = $this->getUser()->getCategoryMenus();
        $ciIds = [];
        foreach ($categoryMenus->getValues() as $categoryMenu) {
            array_push($ciIds, $categoryMenu->getId());
        }
        $menus = $manager->getRepository(Menu::class)->findMenus($ciIds);

        $menu = new Menu();

        $form = $this->createForm(MenuType::class, $menu, [
            "user" => $this->getUser(),
        ]);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $menu = $form->getData();
            $manager->persist($menu);
            $manager->flush();
            $this->addFlash(
                'success',
                "Menu ajouté"
            );
            return $this->redirectToRoute("app_menu");
        }

        return $this->render('menu/index.html.twig', [
            'controller_name' => 'Menus',
            "menus" => $menus,
            "form" => $form->createView(),
        ]);
    }

    /**
     * @Route("/menu/edit/{id}", name="app_menu_edit")
     */
    public function edit(Request $request, EntityManagerInterface $manager, Menu $menu=null): Response
    {
        if($menu == null) {
            return new JsonResponse("Menu doesnt exist");
        }

        if ($menu->getCategory()->getUser() != $this->getUser()) {
            throw $this->createAccessDeniedException();
        }

        $form = $this->createForm(MenuType::class, $menu, [
            "user" => $this->getUser(),
        ]);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $menu = $form->getData();

            $manager->persist($menu);
            $manager->flush();
            $this->addFlash(
                'success',
                'Menu mis à jour'
            );
        }

        return $this->render('menu/edit.html.twig', [
            'controller_name' => "Editer le menu",
            "form" => $form->createView(),
            'referer' => $this->generateUrl("app_menu"),
        ]);
    }

    /**
     * @Route("/menu/remove/{id}", name="app_menu_remove")
     */
    public function remove(Request $request, EntityManagerInterface $manager, Menu $menu = null): Response
    {
        if($menu == null) {
            return new JsonResponse("Menu doesnt exist");
        }

        if ($menu->getCategory()->getUser() != $this->getUser()) {
            throw $this->createAccessDeniedException();
        }

        $manager->remove($menu);
        $manager->flush();
        $this->addFlash(
            'success',
            'Menu supprimé'
        );
        return $this->redirect($request->headers->get('referer'));
    }
}
