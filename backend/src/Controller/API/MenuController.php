<?php

namespace App\Controller\API;

use App\Entity\Menu;
use App\Entity\Ingredient;
use App\Entity\CategoryMenu;
use App\Entity\CategoryIngredient;
use App\Entity\Establishment;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request; 


class MenuController extends AbstractController
{
    /**
     * @Route("/api/menu", name="app_api_menu")
     */
    public function index(Request $request,EntityManagerInterface $manager): Response
    {
        // get body content
        $data = json_decode($request->getContent(), true);
        if(!$data){
            return new JsonResponse(['message' => 'No data'], 403);
        }
        if($data["api_key"] != "12345"){
            return new JsonResponse(['message' => 'Invalid api key'], 403);
        }
        if(!isset($data["user"])){
            return new JsonResponse(['message' => 'No user establishment id'], 403);
        }

        // get user's category menus
        $repo = $manager->getRepository(CategoryMenu::class);

        $categoryMenus = $repo->findBy([ 'user' => $data['user'] ]);

        if(!$categoryMenus){
            return new JsonResponse(['message' => 'No category menus'], 400);
        }

        $ciIds = [];
        foreach ($categoryMenus as $categoryMenu) {
            array_push($ciIds, $categoryMenu->getId());
        }

        // get user's category ingredients for supplements
        $supplements = []; 
        $categoryIngredients = $manager->getRepository(CategoryIngredient::class)->findBy([ 'user' => $data['user'] ]);

        foreach ($categoryIngredients as $categoryIngredient) {
            foreach ($categoryIngredient->getIngredients() as $ingredient) {
                array_push($supplements, [
                    'id' => $ingredient->getId(),
                    'name' => $ingredient->getName(),
                    'isRemoved' => false,
                    'price' => $ingredient->getPrice()
                ]);
            }
        }

        $menus = $manager->getRepository(Menu::class)->findMenus($ciIds);
        $menusSerialized = [];

        foreach ($menus as $menu) {
            $ingredients = [];
            foreach ($menu->getIngredients() as $ingredient) {
                array_push($ingredients, [
                    'id' => $ingredient->getId(),
                    'name' => $ingredient->getName(),
                    'isRemoved' => false,
                    'price' => $ingredient->getPrice()
                ]);
            }
            array_push($menusSerialized, [
                'id' => $menu->getId(),
                'name' => $menu->getName(),
                'price' => $menu->getPrice(),
                'category' => [
                    'id' => $menu->getCategory()->getId(),
                    'name' => $menu->getCategory()->getName()
                ],
                'ingredients' => $ingredients,
                'supplements' => [],
            ]);
        }
 
        return new JsonResponse(['menus' => $menusSerialized, 'supplements' => $supplements]);
    }

    /**
     * @Route("/api/menu/prices", name="app_api_menu_prices")
     */
    public function getPricesForMenus(Request $request, EntityManagerInterface $manager): Response
    {
        // get body content
        $data = json_decode($request->getContent(), true);

        if(!$data){
            return new JsonResponse(['message' => 'No data'], 403);
        }
        if($data["api_key"] != "12345"){
            return new JsonResponse(['message' => 'Invalid api key'], 403);
        }
        
        $menusData = $manager->getRepository(Menu::class)->findMenusIn($data['menus']);
        $supplementsData = $manager->getRepository(Ingredient::class)->findIngredientsIn($data['supplements']);

        $menus = [];
        foreach ($menusData as $menu) {
            array_push($menus, [
                'id' => $menu->getId(),
                'price' => $menu->getPrice(),
                'name' => $menu->getName()
            ]);
        }

        $supplements = [];
        foreach ($supplementsData as $supplement) {            
            array_push($supplements, [
                'id' => $supplement->getId(),
                'price' => $supplement->getPrice(),
                'name' => $supplement->getName()
            ]);
        }

        $menusWithPrices = [
            'menus' => $menus,
            'supplements' => $supplements,
        ];

        return new JsonResponse($menusWithPrices);
    }

    /**
     * @Route("/api/profile", name="app_api_profile")
     */
    public function getProfileCompany(Request $request, EntityManagerInterface $manager): Response
    {
        // get body content
        $data = json_decode($request->getContent(), true);

        if(!$data){
            return new JsonResponse(['message' => 'No data'], 403);
        }
        if($data["api_key"] != "12345"){
            return new JsonResponse(['message' => 'Invalid api key'], 403);
        }
        
        $establishment = $manager->getRepository(Establishment::class)->find($data['company']);

        if(!$establishment){
            return new JsonResponse(['message' => 'No establishment'], 400);
        }
        $tables = [];
        foreach ($establishment->getTables() as $table) {
            array_push($tables, [
                "id" => $table->getId(),
                "number" => $table->getNumber()
            ]);
        }

        $response = [
            "establishment" => $establishment->getId(),
            "name" => $establishment->getName(),
            "user" => $establishment->getUser()->getId(),
            "address" => $establishment->getAddress(),
            "tables" => $tables,
        ];

        return new JsonResponse($response);
    }
}
